'use strict';

var command = require('./baseCommand');

class CommandCollection {
    constructor() {
        this.Commands = [];
        this.length = Commands.length;
    }
    
    Add(command) {
        if(this.Commands.indexOf(command)) {
            throw new Error("Command already exists in the collection");
        }
        this.Commands.Add(command);
    }

    
    Remove(command) {
        for(let i = 0; i < this.Commands.length; i ++ ) {
            if(Commands[i] === command) {
                Commands[i].Remove();
                return;
            }           
            throw new Error("Command not found in collection");
        }
    }
    
    Find(query) {
        for(let i = 0; i < Commands.length; i++) {
            if(Commands[i].command === 'query') {
                return Commands[i];
            }
            throw new Error("Command not found in collection");
        }
    }
}

module.exports = {
    CommandCollection: CommandCollection
};