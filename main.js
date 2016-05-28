require('dotenv').config();
var playFile = require('./lib/playFile');
var Discord = require('discord.js');

var bot = new Discord.Client();
var availableCommands = ['.bag, .gg'];

bot.on('message', function (msg) {
  var voiceChannel = msg.author.voiceChannel;
  var message = msg.content;

  if (!message.startsWith('.')) {
    return;
  }

  switch (message) {
    case '.bag':
      playFile(bot, voiceChannel, 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3');
      break;
    case '.gg':
      playFile(bot, voiceChannel, 'audio/gg.mp3');
      break;
    default:
      bot.reply(msg, 'available commands are: ' + availableCommands);
  }
});

bot.loginWithToken(process.env.BOT_TOKEN);
