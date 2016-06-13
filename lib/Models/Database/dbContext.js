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
        this.db.find(query, function(err, docs) {
            if(err) {
                throw err;       
            }
            return docs;
        });
    }   
}

module.exports = DbContext;