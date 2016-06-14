'use strict';

var Datastore = require ('nedb');

class DbContext {
    constructor(dbName) {
        this.db = {};
        this.dbPath = './db/' + dbName;
        this.db = new Datastore(this.dbPath);
        this.db.loadDatabase();
    }
    
    addEntry(document) {
        this.db.insert(document, function(err) {
            if(err) {
                throw err;
            }
        });
    }
    
    getEntry(query) {
        return new Promise(function (fulfill, reject) {
            this.db.find(query, function (err, docs) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('first' + docs);
                    fulfill(docs);
            }
        });
    });
  }
}
module.exports = DbContext;