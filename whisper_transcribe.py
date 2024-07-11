import sys
import whisper
import ssl
import urllib.request
import torch
import io

# Ignore SSL certificate errors
ssl._create_default_https_context = ssl._create_unverified_context

if len(sys.argv) != 2:
    print("Usage: whisper_transcribe.py <audio_file>")
    sys.exit(1)

audio_file = sys.argv[1]

try:
    # Check if a GPU is available and use it if possible
    device = "cuda" if torch.cuda.is_available() else "cpu"

    # Initialize the Whisper model on the specified device
    model = whisper.load_model("large", device=device)
    # large 29s - line 492
    # medium 18s - line 648
    # small 9s - line 884
    # base 8s - line 884
    # tiny 5s - line 216

    result = model.transcribe(audio_file)

    # Ensure output is in UTF-8
    text = result["text"]
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    print(text)

except Exception as e:
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)

