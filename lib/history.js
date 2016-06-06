var dateFormat = require('dateformat');

/**
 * Records the activities of users based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} channel the given channel
 * @param {Object} user the given user
 */
function history(bot, channel, user) {
  bot.sendMessage(channel.server.channels.get('name', 'history'), '**' + user.username + '**' + ' joined **' + channel.name + '** at **' + dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT Z') + '**');
}

module.exports = history;
