'use strict';

class BaseCommand {
    constructor(bot, command) {
        this.command = command;
        this.bot = bot;
    }
    
    doWork() {
      //implement in child classes  
    } 
}

