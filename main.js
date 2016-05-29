require('dotenv').config();
var playFile = require('./lib/playFile');
var randomRange = require('./lib/randomRange');
var Discord = require('discord.js');

var bot = new Discord.Client();
var availableCommands = ['.bag', '.gg', '.random'];
var random = ['audio/duh1.mp3', 'audio/duh2.mp3', 'audio/duh3.mp3'];
var randomNumber = random.length;

bot.on('message', function (msg) {
  var voiceChannel = msg.author.voiceChannel;
  var message = msg.content;

  if (!message.startsWith('.')) {
    return;
  }

  switch (message) {
    case availableCommands[0]:
      playFile(bot, voiceChannel, '.125',  'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3');
      break;
    case availableCommands[1]:
      playFile(bot, voiceChannel,'.25', 'audio/gg.mp3');
      break;
    case availableCommands[2]:
      playFile(bot, voiceChannel, '1.2', random[randomRange(randomNumber)]);
      break;
    default:
      bot.reply(msg, 'available commands are: ' + availableCommands.join(', '));
  }
});

bot.loginWithToken(process.env.BOT_TOKEN);
