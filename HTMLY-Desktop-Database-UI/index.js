

const sqlite3 = require('sqlite3').verbose();


window.onload = () => {
    const UI = {
        createNewButton: document.getElementById('create-new-button'),
        newMemoryDatabaseTestButton: document.getElementById('newMemoryDatabaseTestButton'),
        inputTest: document.getElementById('memorydb-insert-test'),
        dbNameTest: document.getElementById('new-db-name-test'),
        dbLocTest: document.getElementById('new-db-location') // select option
    }

    UI.createNewButton.addEventListener('click', () => {
        DBFunctions.createNew('test', 'test')
    })

    UI.newMemoryDatabaseTestButton.addEventListener('click', () => {
        newMemoryDatabaseTest()
    })

    // https://github.com/TryGhost/node-sqlite3/wiki/API
    const DBFunctions = {

        createNew: (fileName, storageLoc) => {
          const fname = UI.dbNameTest.value;
          const loc = UI.dbLocTest.selectedOptions[0].value
          const log = `Received ${ fname }, ${ loc } `
          console.log(log)

          const db = new sqlite3.Database(`./DB/${loc}/${fname}`);
        },

        // open: () => {},
        // close: () => {},
        // newTable: (dbPath, tableName, columns),
        runQuery: (table, queryString) => {
            const db = new sqlite3.Database(`./DB/htmly-internals/tests`)
            db.serialize(() => {
                db.run("CREATE TABLE testing (info TEXT)")
                const stmt = db.prepare("INSERT INTO testing VALUES (?)")
                stmt.run('ONE')
                stmt.run('TWO')
                stmt.run('THREE')
                stmt.finalize();
            })
        },

      }

      DBFunctions.runQuery()

    // TESTS
    function newMemoryDatabaseTest() {
        const db = new sqlite3.Database(':memory:');
        const results = [];
        const phrase = UI.inputTest.value;

        db.serialize(() => {
            db.run("CREATE TABLE testing (info TEXT)");

            const stmt = db.prepare("INSERT INTO testing VALUES (?)");

            for (let i = 0; i < 10; i++) {
                stmt.run(` ${phrase}: ${i}`);
            }

            stmt.finalize();

            db.each("SELECT rowid AS id, info FROM testing", (err, row) => {
                results.push(` ${row.id} : ${row.info}`)
            });

            console.log(results);
        });

        db.close();
        document.getElementById('output').innerText = `${results}`;

    }

}

const Queries = {
    newTableString: tableName => {

    }


}





