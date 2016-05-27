require('dotenv').config();
var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('message', function (msg) {
    if (msg.content === 'Ping') {
        bot.sendMessage(msg, 'Pong');
    }
});

bot.loginWithToken(process.env.BOT_TOKEN);
