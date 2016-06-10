'use strict';

var playFile = require('./playFile');
var utils = require('./utils');
var util = require('util');

/**
 * Parses input from Discord based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} msg The given message
 * @param {FastMap} commandMap The given map
 */
function parser(bot, msg, commandMap) {
  console.log(util.inspect(msg, false, null));
  var voiceChannel = msg.author.voiceChannel;
  var channels = msg.server.channels;
  var historyChannel = msg.server.channels.get('name', 'history');
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
    bot.sendMessage(historyChannel, msg.author + ' invoked command \x22.help\x22');
  } else {
    bot.sendMessage(historyChannel, msg.author + ' invoked command \x22' + message + '\x22.');
    playFile(bot, voiceChannel, commandMap.get(message)[1], commandMap.get(message)[0]);
  }
}

module.exports = parser;
