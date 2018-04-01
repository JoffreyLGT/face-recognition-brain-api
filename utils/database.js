let db = null;

if (process.env.DATABASE_URL) {
    db = require('knex')({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        }
    })
} else {
    db = require('knex')({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'joffrey',
            password: 'hello',
            database: 'smart-brain'
        }
    })
}

module.exports = {
    database: db
}