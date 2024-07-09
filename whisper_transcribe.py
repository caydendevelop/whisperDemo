import sys
import whisper
import ssl
import urllib.request

# Ignore SSL certificate errors
ssl._create_default_https_context = ssl._create_unverified_context

if len(sys.argv) != 2:
    print("Usage: whisper_transcribe.py <audio_file>")
    sys.exit(1)

audio_file = sys.argv[1]

try:
    model = whisper.load_model("base")  # Choose the appropriate model size
    result = model.transcribe(audio_file)
    print(result["text"])
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
