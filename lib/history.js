var dateFormat = require('dateformat');

/**
 * Records the history of people joining channels based on the given parameters.
 *
 * @param {Object} bot The given bot Client
 * @param {Object} channel the given channel
 * @param {Object} user the given user
 */
function history(bot, channel, user) {
  var date = new Date();
  var message = '**' + user.username + '**' + ' joined **' + channel.name + '** at **' + dateFormat(date, 'mmmm dS, yyyy, h:MM:ss TT Z') + '**';
  bot.sendMessage(bot.channels.get('name', 'history'), message);
}

module.exports = history;
