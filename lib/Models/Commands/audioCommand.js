'use strict';
var playFile = require('./playFile');

var parent = require ('./baseCommand');

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
