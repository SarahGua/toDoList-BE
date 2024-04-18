const sqlite = require('sqlite3').verbose()

let sql;

//connection to db
const db = new sqlite.Database('./db.db', sqlite.OPEN_READWRITE, (err) => {
    if(err) console.log('errore nella connessione al db', err)
})

//creation table
// sql = `CREATE TABLE note(ID INTEGER PRIMARY KEY, title, description)`
// db.run(sql)

module.exports = db