var dateFormat = require('dateformat');

/**
 * 
 * @param bot
 * @param channel
 * @param user
 */
function history(bot, channel, user) {
  var date = new Date();
  var message = '**' + user.username + '**' + ' joined **' + channel.name + '** at **' + dateFormat(date, 'mmmm dS, yyyy, h:MM:ss TT Z') + '**';
  bot.sendMessage(bot.channels.get('name', 'history'), message);
}

module.exports = history;
