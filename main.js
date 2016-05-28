require('dotenv').config();
var playFile = require('./lib/playFile');
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('message', function (msg) {
  var voiceChannel = msg.author.voiceChannel;
  var message = msg.content;

  switch (message) {
    case 'bag':
      playFile(bot, voiceChannel, 'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3');
      break;
    default:
      return;
  }
});

bot.loginWithToken(process.env.BOT_TOKEN);
