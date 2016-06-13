'use strict';

var reddit = require('redwrap');
var LINQ = require('node-linq').LINQ;
var playFile = require('./playFile');
var utils = require('./utils');
var util = require('util');

var random = utils.dirToArray('./audio/random/');
var tempTrump = utils.dirToArray('./audio/trump/');
var urlArray = [];
var globalBot;
var messageChannel;
var commandMap = utils.getMap();
/**
 * Parses input from Discord based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} msg The given message
 * @param {FastMap} commandMap The given map
 */
function parser(bot, msg, commandMap) {
  globalBot = bot;
  var voiceChannel = msg.author.voiceChannel;
  var historyChannel = msg.channel.server.channels.get('name', 'history');
  var message = msg.content.split(' ');
  if(message[1]) console.log(message[1]);
  var message = message[0];
  if (!message.startsWith('.') || !message[0].startsWith('.')) {
    return;
  }

  if (voiceChannel.server.id !== msg.channel.server.id) {
    return;
  }
  if (message === '.help' || !commandMap.get(message)) {
    var mapKeys = '';
    for (var i = 0; i < commandMap.entries().length; i++) {
      mapKeys += commandMap.entries()[i][0] + ' ';
    }
    bot.reply(msg, 'available commands are: ' + mapKeys);
    bot.sendMessage(historyChannel, msg.author + ' invoked command \x22.help\x22 \n');
  }
  else if (commandMap.get(message)[2] === 'image') {
    var messageChannel = message.channel;
    eval(commandMap.get(message)[0]);
  } else {
    bot.sendMessage(historyChannel, msg.author + ' invoked command \x22' + message + '\x22. \n');
    playFile(bot, voiceChannel, commandMap.get(message)[1], execDecision(message));
  }
}

var execDecision = function (message) {
  if (commandMap.get(message)[2] === "exec") {
    console.log(eval(commandMap.get(message)[0]));
    return eval(commandMap.get(message)[0]);
  }
  else {
    console.log("else");
    return (commandMap.get(message)[0]);
  }
}

var trumpMeme = function (channel) {
  console.log("Channel: " + channel);
  reddit.r('the_donald', function (err, data, res) {
    var parsedData = new LINQ(data.data.children)
      .Where(function (file) {
        if (file.data.url.includes('i.sli.mg') || file.data.url.includes('imgur.com')) {
          return true;
        }
        return false;
      })
      .ToArray().forEach(function (item, index) {
        urlArray.push(item.data.url);
      })
    var image = urlArray[utils.randomRange(urlArray.length)];
    console.log(image);
    globalBot.sendFile(channel, image);
  });
}


module.exports = parser;
