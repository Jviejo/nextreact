const sqlite3 = require('sqlite3')
const { open, Database } = require('sqlite');
const db = new Database(
    {
        filename: './northwind.db',
        driver: sqlite3.Database
    }
)
db.open().then(() => {
    console.log('Database is open');
    }
).catch((err) => {
    console.error('Error opening database', err);
});