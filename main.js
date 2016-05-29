require('dotenv').config();
var playFile = require('./lib/playFile');
var randomRange = require('./lib/randomRange');
var Discord = require('discord.js');

var bot = new Discord.Client();
var availableCommands = ['.bag, .gg'];
var random = ['audio/duh1.mp3', 'audio/duh2.mp3', 'audio/duh3.mp3'];
var randomNumber = random.length;
//console.log(bot.channels.length);
var historyChannel = bot.channels.get('name', 'history');
//console.log(historyChannel.name);
var counter = 1;
bot.on("voiceJoin", function(channel, user) {
        console.log(user.username + " joined " + channel.name);
            bot.sendMessage(historyChannel, "voiceJoin event fired", { }, function (err) {
             //console.log(bot.channels.getAll("name", "history"));
             //console.log ("----");
             //console.log(User.username);
             //console.log(counter++);
       });
});

bot.on('message', function (msg) {
  var voiceChannel = msg.author.voiceChannel;
  var message = msg.content;

  if (!message.startsWith('.')) {
    return;
  }

  switch (message) {
    case '.bag':
      playFile(bot, voiceChannel, '.125',  'https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3');
      break;
    case '.gg':
      playFile(bot, voiceChannel,'.25', 'audio/gg.mp3');
      break;
    case '.random':
      playFile(bot, voiceChannel, '1.2', random[randomRange(randomNumber)]);
      break;
    default:
      bot.reply(msg, 'available commands are: ' + availableCommands);
  }
});

bot.loginWithToken(process.env.BOT_TOKEN);
