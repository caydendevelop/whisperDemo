import sys
import os
import re
import json
from pydub import AudioSegment
from pydub.silence import split_on_silence
import whisper
import ssl

# Ignore SSL certificate errors
ssl._create_default_https_context = ssl._create_unverified_context

def clean_transcription(text):
    # Remove non-alphanumeric characters except for Turkish letters and extra spaces
    return re.sub(r'[^a-zA-Z0-9çÇğĞıİöÖşŞüÜ\s]', '', text).strip()

def transcribe_audio(audio_path):
    # Load the audio file
    audio = AudioSegment.from_file(audio_path)

    # Split audio where silence is 1.0 seconds or more and get chunks
    chunks = split_on_silence(
        audio,
        min_silence_len=1000,  # 1.0 seconds
        silence_thresh=-40,    # Silence threshold (in dBFS)
        keep_silence=500       # Keep 0.5 seconds of leading/trailing silence
    )

    # Initialize the Whisper model
    model = whisper.load_model("large")

    transcriptions = []

    for i, chunk in enumerate(chunks):
        # Export chunk as a temporary WAV file
        chunk_path = f"chunk_{i}.wav"
        chunk.export(chunk_path, format="wav")

        # Transcribe the audio chunk
        result = model.transcribe(chunk_path)
        cleaned_text = clean_transcription(result["text"])
        if cleaned_text:  # Only add non-empty segments
            transcriptions.append(cleaned_text)

        # Remove temporary chunk file
        os.remove(chunk_path)

    return transcriptions

if __name__ == "__main__":
    audio_path = sys.argv[1]
    transcriptions = transcribe_audio(audio_path)
    print(json.dumps(transcriptions))