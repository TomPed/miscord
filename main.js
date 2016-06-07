'use strict';

require('dotenv').config();
var parser = require('./lib/parser');
var history = require('./lib/history');
var presenceUpdated = require ('./lib/presence');
var Discord = require('discord.js');
var Wolfram = require('wolfram-alpha').createClient('KYTUA6-6R7VVL9L5K');

var bot = new Discord.Client();

bot.on('voiceJoin', function (channel, user) {
  history('join', bot, channel, user);
});

bot.on('voiceLeave', function (channel, user) {
  history('leave', bot, channel, user);
});

bot.on('presence', function (oldUser, newUser) {
  presenceUpdated(oldUser, newUser, bot);
});

bot.on('message', function (msg) {
  parser(bot, msg);
});

bot.loginWithToken(process.env.BOT_TOKEN);
