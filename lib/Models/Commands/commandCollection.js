'use strict';

var command = require('./baseCommand');

class CommandCollection {
    constructor() {
        this.Commands = [];
        this.length = function(){
            return this.Commands.length;
        };
    }
    
    Add(command) {
        if(this.Commands.indexOf(command) != -1) {
            throw new Error("Command already exists in the collection");
        }
        this.Commands.push(command);
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
        for(let i = 0; i < this.Commands.length; i++) {
            if(this.Commands[i].command === query) {
                return this.Commands[i];
            }
            throw new Error("Command not found in collection");
        }
    }
}

module.exports = CommandCollection;
