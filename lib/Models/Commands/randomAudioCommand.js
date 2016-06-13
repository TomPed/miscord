'use strict';
var playFile = require('./../../playFile');
var utils = require('./../../utils');

var BaseCommand = require ('./baseCommand');

class RandomAudioCommand extends BaseCommand  {
    
    constructor(command, path, volume, bot) {
        super(bot, command);
        this.path = path;
        this.volume = volume;
        this.fileOptions = utils.dirToArray(this.path);
    }
    
    doWork(voiceChannel) {
      let chosenFile = this.fileOptions[utils.randomRange(this.fileOptions.length)]
      playFile(this.bot, voiceChannel, this.volume, chosenFile);            
    }     
}

module.exports = RandomAudioCommand;