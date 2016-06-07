'use strict';

var dateFormat = require('dateformat');

/**
 * Records the activities of users based on the given parameters.
 *
 * @param {String} event The given event
 * @param {Object} bot The given bot Client
 * @param {Object} channel the given channel
 * @param {Object} user the given user
 */
function history(event, bot, channel, user) {
  if (event === 'leave') {
    bot.sendMessage(channel.server.channels.get('name', 'history'), '**' + user.username + '**' + ' left **' + channel.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
  }
  
  if (event === 'join') {
    bot.sendMessage(channel.server.channels.get('name', 'history'), '**' + user.username + '**' + ' joined **' + channel.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
  }
}

module.exports = history;
