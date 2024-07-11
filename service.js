const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

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

// Function to transcribe audio file using Whisper
const transcribeAudio = (filePath, callback) => {
  const pythonProcess = spawn('python3', ['whisper_transcribe.py', filePath]);

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

    try {
      // Parse and clean the output data
      const transcriptions = JSON.parse(outputData).map(cleanOutputData);
      callback(null, transcriptions);
    } catch (err) {
      callback(
        new Error(`Failed to parse transcription output: ${err.message}`),
      );
    }
  });
};

// Function to query the database
const queryDatabase = (joinedSegments, callback) => {
  console.log('joinedSegments: ', joinedSegments, '\n\n');

  const words = joinedSegments.split(', ').map((word) => `%${word}%`);
  console.log('words: ', words, '\n\n');

  const placeholders = words
    .map(
      () =>
        '(company_name COLLATE NOCASE LIKE ? OR company_number COLLATE NOCASE LIKE ?)',
    )
    .join(' OR ');
  console.log('placeholders: ', placeholders, '\n\n');

  const sql = `SELECT company_name, company_number FROM test_table_1 WHERE ${placeholders}`;
  console.log('SQL Query is: ', sql, '\n\n');

  const params = [].concat(...words.map((word) => [word, word]));
  console.log('params: ', params, '\n\n');

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
