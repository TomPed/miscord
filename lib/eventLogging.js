'use strict';

var dateFormat = require('dateformat');

/**
 * Records the activities of users joining and leaving voice channels based on the given parameters.
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

/**
 * Records the activities of users starting and stopping a game based on the given parameters.
 *
 * @param {Object} oldUser The given old user state
 * @param {Object} newUser The given new user state
 * @param {Object} bot The given bot Client
 */
function presenceUpdated(oldUser, newUser, bot) {
  for (var i = 0; i < bot.servers.length; i++) {
    for (var j = 0; j < bot.servers[i].members.length; j++) {
      if (bot.servers[i].members[j].id === newUser.id) {
        var historyChannel = bot.servers[i].channels.get('name', 'history');
        if (oldUser.status !== newUser.status) {
          var statusVerb;
          if (newUser.status === 'offline' || newUser.status === 'idle') {
            statusVerb = 'gone';
          } else {
            statusVerb = 'come';
          }
          bot.sendMessage(historyChannel, '**' + newUser.username + '**' + ' has ' + statusVerb + ' **' + newUser.status + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
        }
        if (oldUser.game !== newUser.game) {
          if (!newUser.game) {
            bot.sendMessage(historyChannel, '**' + newUser.username + '**' + ' stopped playing **' + oldUser.game.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
          } else {
            bot.sendMessage(historyChannel, '**' + newUser.username + '**' + ' started playing **' + newUser.game.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
          }
        }
      }
    }
  }
}

module.exports = {
  history : history,
  presenceUpdated : presenceUpdated
};
