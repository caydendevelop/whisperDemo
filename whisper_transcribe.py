import sys
import whisper
import ssl
import urllib.request
import torch

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
    model = whisper.load_model("medium", device=device)

    result = model.transcribe(audio_file)
    print(result["text"])
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
