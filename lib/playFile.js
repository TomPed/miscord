/**
 * Plays a file based on the given parameters.
 * 
 * @param {Object} bot The given bot Client
 * @param {Object} voiceChannel The given voice channel
 * @param {String} file String The given file to play
 */
function playFile(bot, voiceChannel, file) {
  bot.joinVoiceChannel(voiceChannel).then(function (voice) {
    voice.playFile(file, {volume : '.125'}).then(function (intent) {
      intent.on('end', function () {
        bot.leaveVoiceChannel(bot.user.voiceChannel);
      });
    }).catch(function (err) {
      throw err;
    });
  }).catch(function (err) {
    throw err;
  });
}

module.exports = playFile;
