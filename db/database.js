// https://stackoverflow.com/questions/46867517/how-to-read-file-with-async-await-properly#:~:text=223-,To,-use%20await/async

const fs = require('fs');
const util = require('util');
const db = './db/db.json';

// https://medium.com/@suyashmohan/util-promisify-in-node-js-v8-d07ef4ea8c53#:~:text=into%20callback%20hell.-,Async%20%26%20Await,-This%20is%20the
// using util.promisify to convert fs.readFile into a promise instead of callback
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class database {
    // ability to read db.json
    async readNotes() {
        try {
            const rawNotes = await readFile(db, 'utf-8');
            return rawNotes ? JSON.parse(rawNotes) : [];  // if db.json is not empty, json parse it. otherwise it is an empty array
        } catch(err) {
            console.log('ERROR', err);
        }
    }

    //ability to update db.json if a note is added or deleted
    // action is add or delete
    async updateNotes(data, action) {
        try {
            await writeFile(db, JSON.stringify(data)).then(() => {
                console.log('Note database updated', action)
            })
        } catch(err) {
            console.log('ERROR', err)
        }
    }

}

module.exports = new database();
