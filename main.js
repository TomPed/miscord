'use strict';

require('dotenv').config();
var eventLogging = require('./lib/eventLogging');
var parser = require('./lib/parser');
var Discord = require('discord.js');
var utils = require('./lib/utils');
var express = require('express');
var app = express();

var bot = new Discord.Client();
var commandMap = utils.getMap();

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

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
