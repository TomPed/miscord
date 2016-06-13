'use strict';

var reddit = require('redwrap');
var LINQ = require('node-linq').LINQ;
var playFile = require('./playFile');
var utils = require('./utils');
var util = require('util');

var random = utils.dirToArray('./audio/random/');
var tempTrump = utils.dirToArray('./audio/trump/');
var bot;
var messageChannel;
var commandMap = utils.getMap();
var validVoiceCommand = true;
/**
 * Parses input from Discord based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} msg The given message
 * @param {FastMap} commandMap The given map
 */
function parser(localBot, msg, commandMap) {
  
  //only worry about the text if it starts with '.'
  if (!msg.content.startsWith('.') || !msg.content.split(' ')[0].startsWith('.')) {
    return;
  }
  
  //ignore the request if the user is in a different server than the server the command was placed in, or the user isn't in a voice channel
  if (msg.author.voiceChannel.server.id !== msg.channel.server.id || !msg.author.voiceChannel.server.id) {
    validVoiceCommand = false;
  }
  
  bot = localBot;
  var voiceChannel = msg.author.voiceChannel;
  var historyChannel = msg.channel.server.channels.get('name', 'history');
  var message = msg.content.split(' ')[0];
  var param = msg.content.split(' ')[1];
  if(param) {
    console.log(param);  
  } 

  //if the command is 'help', or the command isn't found, return available commands
  if (message === '.help' || !commandMap.get(message)) {
    var mapKeys = '';
    for (var i = 0; i < commandMap.entries().length; i++) {
      mapKeys += commandMap.entries()[i][0] + ' ';
    }
    bot.reply(msg, 'available commands are: ' + mapKeys);
    bot.sendMessage(historyChannel, msg.author + ' invoked command \x22.help\x22 \n');
  }
  
  //if the command type is image
  else if (commandMap.get(message)[2] === 'image') {
    messageChannel = msg.channel;
    eval(commandMap.get(message)[0]);
  } else {
    bot.sendMessage(historyChannel, msg.author + ' invoked command \x22' + msg.content + '\x22. \n');
    if(validVoiceCommand) {
      playFile(bot, voiceChannel, commandMap.get(message)[1], execDecision(message));
    }
  }
}

var execDecision = function (message) {
  if (commandMap.get(msg.content)[2] === 'exec') {
    return eval(commandMap.get(message)[0]);
  }
  else {
    return (commandMap.get(message)[0]);
  }
}

//posts a random image from the frontpage of the passed in subreddit
var redditImage = function (channel, subreddit, msg) {
  bot.reply(msg, 'gimme a sec...', function(error, message) {
    if(error) {
      throw error;
    }
  });
  var urlArray = [];
  reddit.r(subreddit).limit(100, function (err, data, res) {
    var parsedData = new LINQ(data.data.children)
      .Where(function (file) {
        if (file.data.url.includes('i.sli.mg') || file.data.url.includes('imgur.com')) {
          return true;
        }
        return false;
      })
      .ToArray().forEach(function (item) {
        urlArray.push([item.data.url, item.data.title]);
      })
    var image = urlArray[utils.randomRange(urlArray.length)];
    bot.sendFile(channel, image[0], null , image[1], function(error, message) {
      if(error) {
        throw error;
      }
      console.log(message);
    });
  });
}


module.exports = parser;
