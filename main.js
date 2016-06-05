require('dotenv').config();
var parser = require('./lib/parser');
var history = require('./lib/history');
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('voiceJoin', function (channel, user) {
  history('join', bot, channel, user);
});

bot.on('voiceLeave', function (channel, user) {
  history('leave', bot, channel, user);
});

bot.on('message', function (msg) {
  parser(bot, msg);
});

bot.loginWithToken(process.env.BOT_TOKEN);
