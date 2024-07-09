const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
let db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS test_table_1 (
        id INTEGER PRIMARY KEY,
        company_name TEXT NOT NULL,
        company_number TEXT NOT NULL
    )`);

  // Insert demo data
  db.run(
    `INSERT INTO test_table_1 (company_name, company_number) VALUES ('Demo Company', '123456')`,
  );
  db.run(
    `INSERT INTO test_table_1 (company_name, company_number) VALUES ('Another Company', '654321')`,
  );
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});
