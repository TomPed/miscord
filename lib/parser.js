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
  var voiceChannel = msg.author.voiceChannel;
  var historyChannel;
  for ( var i = 0; i < bot.channels; i++ ) {
    if (bot.channels[i].server.id === msg.server.id && bot.channels[i].name === 'history') {
      historyChannel = bot.channels[i].server;
      break;
    }
  }
  
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
