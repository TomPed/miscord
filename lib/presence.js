var dateFormat = require('dateformat');

/**
 * Records the activities of users based on the given parameters.
 *
 * @param {Object} oldUser The given old user
 * @param {Object} newUser The given new user
 * @param {Object} bot The given bot Client
 */
function presenceUpdated(oldUser, newUser, bot) {
  for (var i = 0; i < bot.servers.length; i++) {
    for (var j = 0; j < bot.servers[i].members.length; j++) {
      if (bot.servers[i].members[j].id === newUser.id) {
        var historyChannel = bot.servers[i].channels.get('name', 'history');
        if (oldUser.status !== newUser.status) {
          bot.sendMessage(historyChannel, '**' + newUser.username + '**' + ' has gone **' + newUser.status + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
        }
        if (oldUser.game != newUser.game) {
          if (!newUser.game) {
            bot.sendMessage(historyChannel, '**' + newUser.username + '**' + ' stopped playing **' + oldUser.game.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
          }
          else {
            bot.sendMessage(historyChannel, '**' + newUser.username + '**' + ' started playing **' + newUser.game.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
          }
        }
      }
    }
  }
}

module.exports = presenceUpdated;
