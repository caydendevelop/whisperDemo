const express = require('express');
const multer = require('multer');
const { transcribeAudio, queryDatabase } = require('./service');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Utility function to create a standardized response
const createResponse = (respCode, body, message, originalString = null) => {
  return {
    respCode: respCode,
    body: body,
    message: message,
    originalString: originalString,
  };
};

// Configure Multer to accept specific file types
const fileFilter = (req, file, cb) => {
  console.log('Uploaded MIME type: ', file.mimetype); // Print the MIME type
  const allowedMimeTypes = [
    'audio/m4a',
    'audio/x-m4a',
    'audio/mp3',
    'audio/webm',
    'audio/mp4',
    'audio/mpga',
    'audio/wav',
    'audio/mpeg',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only audio files are allowed!'), false);
  }
};

const upload = multer({
  dest: 'uploads/',
  fileFilter: fileFilter,
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json(createResponse(-1, null, 'No file uploaded'));
  }

  const filePath = req.file.path;

  transcribeAudio(filePath, (err, segments) => {
    if (err) {
      return res.status(500).json(createResponse(-1, null, err.message));
    }

    // Join segments with commas
    const joinedSegments = segments.join(', ');

    // Check if the transcription result is null or empty
    if (!joinedSegments || joinedSegments === '') {
      return res
        .status(500)
        .json(createResponse(-1, null, 'Transcription result is empty'));
    }

    // Call queryDatabase with the joined transcription result
    queryDatabase(joinedSegments, (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json(
            createResponse(
              -1,
              null,
              `Database error: ${err.message}`,
              joinedSegments,
            ),
          );
      }

      if (rows.length === 0) {
        return res.json(
          createResponse(
            0,
            rows,
            `${joinedSegments} is not found in the database`,
            joinedSegments,
          ),
        );
      }

      res.json(createResponse(0, rows, 'Success!', joinedSegments));
    });
  });
});

app.post('/api/query', (req, res) => {
  const queryList = req.body.keywordsList;

  if (!queryList || !Array.isArray(queryList)) {
    return res
      .status(400)
      .json(
        createResponse(
          -1,
          null,
          'No query list provided or it is not an array',
        ),
      );
  }

  const queryStr = queryList.join(', ');

  queryDatabase(queryStr, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json(
          createResponse(-1, null, `Database error: ${err.message}`, queryStr),
        );
    }

    if (rows.length === 0) {
      return res.json(
        createResponse(
          0,
          rows,
          `${queryStr} is not found in the database`,
          queryStr,
        ),
      );
    }

    res.json(createResponse(0, rows, 'Success!', queryStr));
  });
});

const PORT = process.env.PORT || 3068;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
