[![Build Status](https://travis-ci.org/TomPed/miscord.svg?branch=master)](https://travis-ci.org/TomPed/miscord)

# :no_mouth: Miscord :fire:

Miscord, or Meme Discord, is a meme bot for [Discord](https://discordapp.com/). I meme, who doesn't like memes, you know what I meme :boom:?

We are primarily making memes from games that our friends play together. If you have any requests just make an issue or a pull request!

##  Using Miscord on Your Server

Add [the bot](https://discordapp.com/oauth2/authorize?&client_id=185584861463969793&scope=bot) to your Discord server.

If you type `.help` it will list the commands you can use. Along with memes, Miscord also logs users joining and leaving voice channels in the server. For this to work you must have a text channel called `history` (you should mute this channel so you don't get notifications).

## Build Guide

1. Run `git clone git@github.com:TomPed/miscord.git`
2. Run `npm install`
  - Before you run `npm install` you must meet the following:
    1. Have [Node](https://nodejs.org/en/) installed (Add Node to path for Windows)
    2. Have [Python 2.7.x](https://www.python.org/downloads/) installed
    3. [FFMPEG](https://ffmpeg.org/download.html) installed to path
      - [Tutorial](https://www.youtube.com/watch?v=xcdTIDHm4KM) to do this on Windows
    4. [Visual Studio](https://www.visualstudio.com/en-us/visual-studio-homepage-vs.aspx) installed (Windows) or [Xcode](https://developer.apple.com/xcode/) installed (Mac)
3. Run `npm run bot` to run the bot

![nicememe](./img/nicememe.jpg)
