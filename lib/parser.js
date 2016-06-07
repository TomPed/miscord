'use strict';

var playFile = require('./playFile');
var randomRange = require('./randomRange');

var availableCommands = ['.help', '.bag', '.gg', '.random', '.dp', '.lion', '.cheers'];
var random = ['./audio/duh1.mp3', './audio/duh2.mp3', './audio/duh3.mp3'];
var randomNumber = random.length;

/**
 * Parses input from Discord based on the given parameters.
 * 
 * @param {Object} bot The given bot Client
 * @param {Object} msg The given message
 */
function parser(bot, msg) {
  var voiceChannel = msg.author.voiceChannel;
  var message = msg.content;

  if (!message.startsWith('.')) {
    return;
  }

  if (voiceChannel.server.id !== msg.channel.server.id) {
    return;
  }
  
  switch (message) {
    case availableCommands[0]:
      bot.reply(msg, 'available commands are: ' + availableCommands.join(', '));
      break;
    case availableCommands[1]:
      playFile(bot, voiceChannel, '.125', 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3');
      break;
    case availableCommands[2]:
      playFile(bot, voiceChannel, '.25', './audio/gg.mp3');
      break;
    case availableCommands[3]:
      playFile(bot, voiceChannel, '1.2', random[randomRange(randomNumber)]);
      break;
    case availableCommands[4]:
      playFile(bot, voiceChannel, '.125', 'http://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Dpro_wailing_03.mp3');
      break;
    case availableCommands[5]:
      playFile(bot, voiceChannel, '.125', 'http://hydra-media.cursecdn.com/dota2.gamepedia.com/4/4a/Lion_respawn_01.mp3');
      break;
    case availableCommands[6]:
      playFile(bot, voiceChannel, '.5',  'https://my.mixtape.moe/dcvdxs.wav');
      break;
    default:
      bot.reply(msg, 'available commands are: ' + availableCommands.join(', '));
  }
}

module.exports = parser;
