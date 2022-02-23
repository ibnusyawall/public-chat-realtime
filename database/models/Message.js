const { connection } = require('./../')
const { Model } = require('./Model')

const table_name = 'messages'
const query = `CREATE TABLE IF NOT EXISTS ? (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
pesan TEXT NOT NULL,
nama VARCHAR(255) NOT NULL);
`.replace(/\?/g, table_name)

connection.query(query, (err, result) => {
    if (err) console.log('[×] Error mysql:', err)
    console.log(result)
})

const Connection = connection.promise()

class Message extends Model {
    constructor(...args) {
        super(...args)
        this.table_name = table_name
    }
}

module.exports = { Message }
