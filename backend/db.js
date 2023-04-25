const sqlite3 = require("sqlite3");
const database = sqlite3.verbose();
const fileStream = require('fs');

fileStream.open('cat.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

const db = new sqlite3.Database("./cat.db", database.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("connection succesful");
  });
  
db.run('CREATE TABLE cats(id INTEGER PRIMARY KEY AUTOINCREMENT, catName TEXT, catGender TEXT, catAge INTEGER)');
