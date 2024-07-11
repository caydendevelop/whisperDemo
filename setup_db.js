const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Connect to the SQLite database
let db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTableAndInsertData();
  }
});

function createTableAndInsertData() {
  db.serialize(() => {
    // Create table
    db.run(
      `CREATE TABLE IF NOT EXISTS test_table_1 (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          company_name TEXT NOT NULL,
          company_number TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          closeDatabase();
          return;
        }
        console.log('Table created or already exists.');

        // Read SQL insert statements from the file
        const sqlFilePath = path.join(__dirname, 'insert_statements.sql');
        const insertStatements = fs.readFileSync(sqlFilePath, 'utf-8');

        // Execute the insert statements in a transaction
        db.exec('BEGIN TRANSACTION;', (err) => {
          if (err) {
            console.error('Error starting transaction:', err.message);
            closeDatabase();
            return;
          }

          db.exec(insertStatements, (err) => {
            if (err) {
              console.error('Error executing insert statements:', err.message);
              closeDatabase();
              return;
            }

            db.exec('COMMIT;', (err) => {
              if (err) {
                console.error('Error committing transaction:', err.message);
                closeDatabase();
                return;
              }

              console.log('Insert statements executed successfully.');
              closeDatabase();
            });
          });
        });
      },
    );
  });
}

function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Closed the database connection.');
    }
  });
}
