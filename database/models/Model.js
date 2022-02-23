const { connection } = require('./../')

const Connection = connection.promise()

class Model {
    constructor() {
        this.table_name = null
    }
    set _table_name(name) {
        this.table_name = name
    }
    get _table_name() {
        return this.table_name
    }
    findAll() {
        return new Promise(async(resolve, reject) => {
            let query = 'select * from `?`'.replace(/\?/, this.table_name)
            try {
                let [ rows ] = await Connection.query(query)
                resolve({ rows })
            } catch(e) {
                reject(null)
            }
        })
    }
    insert({ data }) {
        return new Promise(async(resolve, reject) => {
            let query = 'insert into `?`'
            query = query.replace(/\?/, this.table_name)
            query += `(${Object.keys(data).join`,`}) values (${Object.values(data).map(v => `'${v}'`)})`
            try {
                let [ rows ] = await Connection.query(query)
                resolve({ rows })
            }catch(e) {
                reject({ q: query, e: e })
            }
        })
    }
}

module.exports = { Model }
