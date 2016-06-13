'use strict';


/**
 * Plays a file based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} voiceChannel The given voice channel
 * @param {String} volume The given volume
 * @param {String} file The given file to play
 */

var localBot; 
var localChannel;
function playFile(bot, voiceChannel, volume, file) {
  localBot = bot;
  localChannel = voiceChannel;
  bot.joinVoiceChannel(voiceChannel, function(error, voice) {
    if (voice.playing) {
      return;
    }
    voice.playFile(file, { volume: volume }, function(error, intent) {
        intent.once("end", endPlayback);
    });
  });
}

function endPlayback() {
  setTimeout(function() {
    localBot.leaveVoiceChannel(bot.voiceChannel)}, 
    1500
    );
  }

module.exports = playFile;
