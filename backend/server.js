const database = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new database.Database("./cat.db", database.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Sikeres csatlakozás");
});

app.get("/checkCats", function (request, response) {
  const sql = 'SELECT * FROM cats';
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {
      console.log(rows);
    }))
    response.send(rows);
  });

});

app.post('/addCat/:param', function (request, response) {
  var data = request.params.param.split(';');

  const sql = "INSERT into cats (catName, catGender, catAge) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "')";
  db.run(sql);
  console.log("Új macska sikeresen hozzáadva");
});

app.post('/editCatData/:param', function (request, response) {
  var data = request.params.param.split(';');
  const sql = "UPDATE cats SET catName='" + data[1] + "', catGender='" + data[2] + "', catAge='" + data[3] + "' WHERE id='" + data[0] + "'";
  db.run(sql);
  console.log("Macska sikeresen frissítve");

});

app.post('/adoptCat/:param', function (request, response) {
  var data =request.params.param;
  const sql = "delete from cats where id = "+data+"";
  db.run(sql);
  console.log("Macska sikeresen adoptálva");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Szerver sikeresen elindult.");
});