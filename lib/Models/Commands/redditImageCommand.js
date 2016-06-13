'use strict';

var parent = require ('./baseCommand');
var reddit = require('redwrap');
var LINQ = require('node-linq').LINQ;

class RedditImageCommand extends BaseCommand {
    constructor() {
        super();
    }
    
    doWork(channel, subreddit, msg) {
        bot.reply(msg, 'gimme a sec...', function (error, message) {
            if (error) {
                throw error;
            }
            console.log(message);
        });
        var urlArray = [];
        reddit.r(subreddit).limit(100, function (err, data) {
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
            bot.sendFile(channel, image[0], null, image[1], function (error, message) {
                if (error) {
                    throw error;
                }
                console.log(message);
            });
        });
    }
}
