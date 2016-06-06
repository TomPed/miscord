require('dotenv').config();
var parser = require('./lib/parser');
var history = require('./lib/history');
var presenceUpdated = require ('./lib/presence');
var Discord = require('discord.js');

var bot = new Discord.Client();
var historyChannel = "";

bot.on('voiceJoin', function (channel, user) {
  history(bot, channel, user);
});

bot.on('presence', function (oldUser, newUser) {
  presenceUpdated(oldUser, newUser, bot);
});

bot.on('message', function (msg) {
  parser(bot, msg);
});

bot.loginWithToken(process.env.BOT_TOKEN);
