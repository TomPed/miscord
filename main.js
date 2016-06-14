'use strict';

require('dotenv').config();
var eventLogging = require('./lib/eventLogging');
var parser = require('./lib/parser');
var Discord = require('discord.js');
var utils = require('./lib/utils');
var DbContext = require('./lib/Models/Database/DbContext');
var db = new DbContext('preference.db');
var bot = new Discord.Client();
var commandCollection = require('./lib/Models/Commands/commandCollection');
var audioCommand = require('./lib/Models/Commands/audioCommand');
var randomAudioCommand = require('./lib/Models/Commands/randomAudioCommand');
var commandMap = utils.getMap();
var command = new audioCommand('.gg', 'audio/gg.mp3', '1', bot);
var random = new randomAudioCommand('.random', 'audio/random/', '1', bot);
var collection = new commandCollection();
var service = require('./lib/Models/Services/commandService');
collection.Add(command);
collection.Add(random);
collection.Find('.gg').doWork();
console.log(collection.length());
var commandService = new service(db, collection);
commandService.populateCollection().then(function(resolve) {
  console.log(resolve);
})


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
