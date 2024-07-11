const { spawn, execSync } = require('child_process');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Initialize SQLite database
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Function to clean the output data
const cleanOutputData = (data) => {
  return data.replace(/[^a-zA-Z0-9çÇğĞıİöÖşŞüÜ\s]/g, '').trim();
};

// Function to determine the Python interpreter
const getPythonInterpreter = () => {
  try {
    execSync('python --version');
    return 'python';
  } catch (e) {
    try {
      execSync('python3 --version');
      return 'python3';
    } catch (e) {
      throw new Error('Python is not installed or not found in PATH');
    }
  }
}

// Function to transcribe audio file using Whisper
const transcribeAudio = (filePath, callback) => {
  const pythonInterpreter = getPythonInterpreter();
  const pythonProcess = spawn(pythonInterpreter, [
    'whisper_transcribe.py',
    filePath,
  ]);

  let outputData = '';
  let errorData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  pythonProcess.on('close', (code) => {
    fs.unlinkSync(filePath); // Clean up the uploaded file

    if (code !== 0) {
      console.error(`stderr: ${errorData}`);
      return callback(new Error(`Error processing file: ${errorData}`));
    }

    // Clean the output data
    const cleanedOutput = cleanOutputData(outputData);
    callback(null, cleanedOutput);
  });
};

// Function to query the database
const queryDatabase = (queryStr, callback) => {
  const words = queryStr.split(' ').map((word) => `%${word}%`);
  const placeholders = words
    .map(
      (word) =>
        '(company_name COLLATE NOCASE LIKE ? OR company_number COLLATE NOCASE LIKE ?)',
    )
    .join(' OR ');

  const sql = `SELECT company_name, company_number FROM test_table_1 WHERE ${placeholders}`;
  const params = [].concat(...words.map((word) => [word, word]));

  db.all(sql, params, (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

module.exports = {
  transcribeAudio,
  queryDatabase,
};
