require('dotenv').config();
var dateFormat = require('dateformat');
var playFile = require('./lib/playFile');
var randomRange = require('./lib/randomRange');
var Discord = require('discord.js');

var bot = new Discord.Client();
var availableCommands = ['.bag', '.gg', '.random', '.dp','.lion'];
var random = ['audio/duh1.mp3', 'audio/duh2.mp3', 'audio/duh3.mp3'];
var randomNumber = random.length;
//console.log(bot.channels.length);
var historyChannel = bot.channels.get('name', 'history');

//console.log(historyChannel.name);
var counter = 1;
bot.on("voiceJoin", function(channel, user) {
        var d = new Date();
        var timeZone = d.toString().match(/\(([A-Z\s].*)\)/)[1]
        console.log(user.username + " joined " + channel.name);
        var message = "**" + user.username + "**" + " joined **" + channel.name + "** at **" + dateFormat(d, "mmmm dS, yyyy, h:MM:ss TT Z") + "**";
        bot.sendMessage(bot.channels.get("name", "history"), message);
       });

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
    case availableCommands[3]:
      playFile(bot, voiceChannel, '.5',  'http://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Dpro_wailing_03.mp3');
      break;
    case availableCommands[4]:
      playFile(bot, voiceChannel, '.5',  'http://hydra-media.cursecdn.com/dota2.gamepedia.com/4/4a/Lion_respawn_01.mp3');
      break;
    default:
      bot.reply(msg, 'available commands are: ' + availableCommands.join(', '));
  }
});

bot.loginWithToken(process.env.BOT_TOKEN);
