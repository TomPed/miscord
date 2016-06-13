'use strict';

var BaseCommand = require ('./baseCommand');
var playFile = require('./../../playFile');


class AudioCommand extends BaseCommand  {
    
    constructor(command, path, volume, bot) {
        super(bot, command);
        this.path = path;
        this.volume = volume;
    }
    
    doWork(voiceChannel) {
      playFile(this.bot, voiceChannel, this.volume, this.path);            
    }     
}

module.exports = AudioCommand;
