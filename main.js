require('dotenv').config();
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('message', function (msg) {
  var userChannel = msg.author.voiceChannel;

  if (msg.content === 'bag') {
    bot.joinVoiceChannel(userChannel, function (error, voice) {
      if (error) throw error;
      voice.playFile('https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3', {volume: '.25'}, function (error, intent) {
        if (error) throw error;
        intent.on('end', function () {
          bot.leaveVoiceChannel(userChannel, function (err) {
            console.log(err);
          });
        });
      });
    })
  }
});

bot.loginWithToken(process.env.BOT_TOKEN);