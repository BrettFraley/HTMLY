const sqlite3 = require('sqlite3').verbose();

function loadDatabase() {
  const db = new sqlite3.Database(':memory:');

  db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");
    db.run("INSERT INTO lorem VALUES ('Hello, World!')");

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      if (err) {
        console.error(err);
      } else {
        document.getElementById('output').innerText = `ID: ${row.id}, Info: ${row.info}`;
      }
    });
  });

  db.close();
}

