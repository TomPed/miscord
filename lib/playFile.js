/**
 * Plays a file based on the given parameters.
 * 
 * @param {Object} bot The given bot Client
 * @param {Object} voiceChannel The given voice channel
 * @param {String} volume The given volume
 * @param {String} file The given file to play
 */
function playFile(bot, voiceChannel, volume, file) {
  bot.joinVoiceChannel(voiceChannel).then(function (voice) {
    if (voice.playing) {
      return;
    }
    voice.playFile(file, {volume : volume}).then(function (intent) {
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
