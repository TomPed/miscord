'use strict';

require('dotenv').config();
var eventLogging = require('./lib/eventLogging');
var parser = require('./lib/parser');
var Discord = require('discord.js');
var utils = require('./lib/utils');
var DbContext = require('./lib/DbContext');
var db = new DbContext('preference.db');
var bot = new Discord.Client();
var commandMap = utils.getMap();

db.getEntry({ _id: '123'}, function(docs) {
  console.log(docs);  
});

bot.on('voiceJoin', function (channel, user) {
  eventLogging.history('join', bot, channel, user);
});

bot.on('voiceLeave', function (channel, user) {
  eventLogging.history('leave', bot, channel, user);
});

bot.on('presence', function (oldUser, newUser) {
  eventLogging.presenceUpdated(oldUser, newUser, bot);
});

bot.on('message', function (msg) {
  parser(bot, msg, commandMap);
});

bot.loginWithToken(process.env.BOT_TOKEN);
