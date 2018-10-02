const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users: [] }).write();

module.exports = db;

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dldudgml!1',
    database: 'opentutorials',
});
  
db.connect();
module.exports = db;