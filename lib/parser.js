'use strict';

var playFile = require('./playFile');
var utils = require('./utils');
var historyChannel = require('./eventLogging');

/**
 * Parses input from Discord based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} msg The given message
 * @param {FastMap} commandMap The given map
 */
function parser(bot, msg, commandMap) {
  var voiceChannel = msg.author.voiceChannel;
  var message = msg.content;
  if (!message.startsWith('.')) {
    return;
  }

  if (voiceChannel.server.id !== msg.channel.server.id) {
    return;
  }
  if (message === '.help') {
    var mapKeys = '';
    for (var i = 0; i < commandMap.entries().length; i++) {
      mapKeys += commandMap.entries()[i][0] + ' ';
    }
    bot.reply(msg, 'available commands are: ' + mapKeys);
    utils.postMessage(historyChannel.historyChannel, msg.author + ' invoked command \x22.help\x22', bot);
  } else {
    utils.postMessage(historyChannel.historyChannel, msg.author + ' invoked command \x22' + message + '\x22.', bot);
    playFile(bot, voiceChannel, commandMap.get(message)[1], commandMap.get(message)[0]);
  }
}

module.exports = parser;
