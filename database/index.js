const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'rl_chat',
    password: 'root',
    multipleStatements: true,
})

connection.connect(e => {
    if (e) console.log('[×] Error mysql:', e.stack)
    console.log('[#] Mysql connected.')
})

module.exports = { connection }
