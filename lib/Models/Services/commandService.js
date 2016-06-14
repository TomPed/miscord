'use strict';

var dbContext = require('../Database/dbContext');
var commandCollection = require('../Commands/commandCollection');
class CommandService {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }
    
    populateCollection() {
       return new Promise(function(resolve) {
           resolve({
               value: this.db.getEntry({type: 'audio'})
           });
       })
    }
    
    populateDatabase() {
        
    }
}

module.exports = CommandService;