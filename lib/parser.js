'use strict';

var fs = require('fs');
var reddit = require ('redwrap');
var LINQ = require('node-linq').LINQ;
var playFile = require('./playFile');
var random = ['./audio/duh1.mp3', './audio/duh2.mp3', './audio/duh3.mp3'];
var randomTrump = ['https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/753/original/I\'m_really_rich.wav', 'https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/768/original/we\'re_going_to_make_america_great.wav', 'https://d2eopxgp627wep.cloudfront.net/ps/audios/000/000/838/original/if_she_wasn\'t_my_daughter.wav'];
var tempTrump = [];
var urlArray = [];
var globalBot;
var messageChannel;
fs.readdir('./audio/trump', function(err, files) {
  if(!err) {
      for(var i = 0; i < files.length; i++) { 
        tempTrump.push("./audio/trump/" + files[i]);
      }
  }
  else {
    throw err;
  }
});
var utils = require('./utils');
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
  var message = msg.content;
  if (!message.startsWith('.')) {
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

var execDecision = function(message) {
      if (commandMap.get(message)[2] === "exec") {
                console.log(eval(commandMap.get(message)[0]));
        return eval(commandMap.get(message)[0]);
      }
      else {
                console.log("else");
        return (commandMap.get(message)[0]);
      }  
}

var trumpMeme = function(channel) {
  console.log("CHannel: " + channel);
  reddit.r('the_donald', function(err, data, res) {
    var parsedData = new LINQ(data.data.children)
    .Where(function(file) {
      if(file.data.url.includes('i.sli.mg') || file.data.url.includes('imgur.com')) {
        return true;
      }
      return false;
    })
    .ToArray().forEach(function(item, index) {
      urlArray.push(item.data.url);
    })
    var image = urlArray[utils.randomRange(urlArray.length)];
    console.log(image);
    globalBot.sendFile(channel, image);
  });
}


module.exports = parser;
