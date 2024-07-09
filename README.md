# Whisper  Demo Documentation


### For Windows, Linux, and macOS

1. **Node.js and npm**:
Ensure Node.js and npm are installed. You can download and install Node.js from [nodejs.org](https://nodejs.org/). npm comes bundled with Node.js.

2. **Python**:
Ensure Python 3.x is installed. You can download and install Python from [python.org](https://www.python.org/).

3. **FFmpeg**:
FFmpeg is required for audio processing. Install FFmpeg by following the instructions for your OS below.

4. **SQLite3**:
SQLite3 is required for the database. Install SQLite3 by following the instructions for your OS below.

5. **Whisper**:
Whisper requires PyTorch and the Whisper library from OpenAI.

6. **NPM Libraries**:
The project also requires some npm libraries, which we will install via npm.

### Windows

1. **Install Node.js and npm**:
    - Download the Node.js installer from [nodejs.org](https://nodejs.org/).
    - Run the installer and follow the on-screen instructions.
    - Verify installation by running `node -v` and `npm -v` in the Command Prompt.

2. **Install Python**:
    - Download the Python installer from [python.org](https://www.python.org/).
    - Run the installer and ensure you select "Add Python to PATH".
    - Verify installation by running `python --version` in the Command Prompt.

3. **Install FFmpeg**:
    - Download FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html).
    - Extract the downloaded ZIP file to a folder.
    - Add the FFmpeg `bin` folder to your system PATH.

4. **Install SQLite3**:
    - Download SQLite3 from sqlite.org.
    - Extract the downloaded ZIP file to a folder.
    - Add the SQLite3 folder to your system PATH.

5. **Install Whisper**:
    - Install PyTorch and Whisper using pip:
    
    ```bash
    pip install torch torchvision torchaudio
    pip install openai-whisper
    ```
    
6. **Install NPM Libraries**:
    - Install the required npm libraries:
    
    ```bash
    npm install express multer sqlite3 child_process
    ```
    

### Linux

1. **Install Node.js and npm**:
    
    ```
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
    
2. **Install Python**:
    
    ```
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip
    ```
    
3. **Install FFmpeg**:
    
    ```
    sudo apt-get install -y ffmpeg
    ```
    
4. **Install SQLite3**:
    
    ```
    sudo apt-get install -y sqlite3
    ```
    
5. **Install Whisper**:
    - Install PyTorch and Whisper using pip:
    
    ```
    pip3 install torch torchvision torchaudio
    pip3 install openai-whisper
    ```
    
6. **Install NPM Libraries**:
    - Install the required npm libraries:
    
    ```
    npm install express multer sqlite3 child_process
    ```
    

### macOS

1. **Install Homebrew** (if not already installed):
    
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    
2. **Install Node.js and npm**:
    
    ```
    brew install node
    ```
    
3. **Install Python**:
    
    ```
    brew install python
    ```
    
4. **Install FFmpeg**:
    
    ```
    brew install ffmpeg
    ```
    
5. **Install SQLite3**:
    
    ```
    brew install sqlite
    ```
    
6. **Install Whisper**:
    - Install PyTorch and Whisper using pip:
    
    ```
    pip install torch torchvision torchaudio
    pip install openai-whisper
    ```
    
7. **Install NPM Libraries**:
    - Install the required npm libraries:
    
    ```
    npm install express multer sqlite3
    ```
    

### Installation Scripts

### Windows (install_prerequisites.bat)

```bash
@echo off

REM Install Node.js and npm
powershell -Command "Start-Process 'https://nodejs.org/dist/v14.17.3/node-v14.17.3-x64.msi' -Wait"

REM Install Python
powershell -Command "Start-Process 'https://www.python.org/ftp/python/3.9.6/python-3.9.6-amd64.exe' -ArgumentList '/quiet InstallAllUsers=1 PrependPath=1' -Wait"

REM Install FFmpeg
powershell -Command "Invoke-WebRequest -Uri 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z' -OutFile 'ffmpeg-release-full.7z'"
powershell -Command "Expand-Archive -Path 'ffmpeg-release-full.7z' -DestinationPath 'C:\ffmpeg' -Force"
setx /M PATH "C:\ffmpeg\bin;%PATH%"

REM Install SQLite3
powershell -Command "Invoke-WebRequest -Uri 'https://www.sqlite.org/2021/sqlite-tools-win32-x86-3360000.zip' -OutFile 'sqlite-tools-win32-x86-3360000.zip'"
powershell -Command "Expand-Archive -Path 'sqlite-tools-win32-x86-3360000.zip' -DestinationPath 'C:\sqlite' -Force"
setx /M PATH "C:\sqlite;%PATH%"

REM Install PyTorch and Whisper
pip install torch torchvision torchaudio
pip install openai-whisper

REM Install NPM libraries
npm install express multer sqlite3 child_process

REM Verify installations
node -v
npm -v
python --version
ffmpeg -version
sqlite3 --version

pause
```

### Linux (install_prerequisites.sh)

```bash
#!/bin/bash

# Update package list and install prerequisites
sudo apt-get update
sudo apt-get install -y curl python3 python3-pip ffmpeg sqlite3

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PyTorch and Whisper
pip3 install torch torchvision torchaudio
pip3 install openai-whisper

# Install NPM libraries
npm install express multer sqlite3 child_process

# Verify installations
node -v
npm -v
python3 --version
ffmpeg -version
sqlite3 --version
```

### macOS (install_prerequisites.sh)

```
#!/bin/bash

# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js, Python, FFmpeg, and SQLite3 using Homebrew
brew install node
brew install python
brew install ffmpeg
brew install sqlite

# Install PyTorch and Whisper
pip3 install torch torchvision torchaudio
pip3 install openai-whisper

# Install NPM libraries
npm install express multer sqlite3 child_process

# Verify installations
node -v
npm -v
python3 --version
ffmpeg -version
sqlite3 --versio
```

### Usage Guide

1. **Clone the Repository**:
Clone the repository containing the web application code to your local machine.
    
    ```
    git clone https://github.com/your-repo/your-project.git
    cd your-project
    ```
    
2. **Install Dependencies**:
Install the necessary npm packages.
    
    ```
    npm install
    ```
    
3. **Set Up SQLite Database**:
Create an SQLite database and set up the required schema and initial data.
    
    ```
    node setup_db.js
    ```
    
4. **Run the Server**:
Start the Node.js server.
    
    ```
    node server.js
    ```
    

### Using the Web Application

### Upload an Audio File

1. **Open the HTML Form**:
Open your web browser and navigate to the form page for uploading audio files. For example, if you have an `index.html` file, you can open it directly in your browser.

2. **Upload the File**:
Use the form to select and upload an audio file. The supported formats are `.m4a`, `.mp3`, `.webm`, `.mp4`, `.mpga`, `.wav`, and `.mpeg`.

3. **Receive the Response**:
After the file is uploaded, you will receive a JSON response with the transcription result and the query result from the database.
    
    Example response:
    
    ```json
    {
        "respCode": 0,
        "body": [
            {
                "company_name": "Demo Company",
                "company_number": "123456"
            }
        ],
        "message": "Success!",
        "originalString": "Demo"
    }
    ```
    

### Query the Database Directly

1. **Send a GET Request**:
Use a tool like Postman or your web browser to send a GET request to the `/api/query` endpoint with a query parameter `keyword` (NOT not case sensitive to facilitate SELECT) 
    
    ```
    http://localhost:3068/api/query?keyword=Demo // deMo , DEmo are fine as well
    ```
    
2. **Receive the Response**:
You will receive a standardized JSON response with the query result from the database.
    
    Example response for a found record:
    
    ```json
    {
        "respCode": 0,
        "body": [
            {
                "company_name": "Demo Company",
                "company_number": "123456"
            }
        ],
        "message": "Success!",
        "originalString": "Demo"
    }
    ```
    
    Example response for a not found record:
    
    ```json
    {
        "respCode": 0, // If error instead of not found, this would be -1
        "body": [],
        "message": "Demo is not found in the database",
        "originalString": "Demo"
    }
    ```
    

### Summary

1. **Prerequisites**:
    - Install Node.js, npm, Python, FFmpeg, SQLite3, and Whisper.
    - Use the provided installation scripts for Windows, Linux, and macOS.

2. **Setup**:
    - Clone the repository.
    - Install npm dependencies.
    - Set up the SQLite database.

3. **Usage**:
    - Upload audio files using the provided HTML form.
    - Query the database directly via the `/api/query` endpoint.
4. `frontend.html` is used for testing upload
    1. https://voicemaker.in/ is recommended to generate voice from text
    

By following this guide, you will be able to set up and use the web application on Windows, Linux, and macOS.
