'use strict';

var FastMap = require('collections/fast-map');

/**
 * Gets a random integer between zero to the given parameter.
 *
 * @param {Number} range The given range
 * @returns {number} The random integer
 */
function randomRange(range) {
  return Math.floor(Math.random() * range);
}

/**
 * Gets a map.
 *
 * @returns {FastMap}
 */
function getMap() {
  var localMap = new FastMap();
  localMap.set('.bag', ['https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3', '.125', 'url']);
  localMap.set('.gg', ['./audio/gg.mp3', '.25', 'file']);
  localMap.set('.dp', ['http://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Dpro_wailing_03.mp3', '.125', 'url']);
  localMap.set('.lion', ['http://hydra-media.cursecdn.com/dota2.gamepedia.com/4/4a/Lion_respawn_01.mp3', '.125', 'url']);
  localMap.set('.cheers', ['https://my.mixtape.moe/dcvdxs.wav', '.5', 'file']);
  localMap.set('.random', ['random[utils.randomRange(random.length)]', '1.2', 'exec']);
  localMap.set('.trump', ['tempTrump[utils.randomRange(tempTrump.length)]', '2.0', 'exec']);
  localMap.set('.trump-meme', ['trumpMeme(msg.channel);', null, 'image']);
  return localMap;
}

/**
 * Posts a message to the server.
 *
 * @param {Object} message The given message
 * @param {Object} channel Then given channel
 * @param {Object} bot The given bot Client
 */
function postMessage(channel, message, bot) {
  bot.sendMessage(channel, message);
}

module.exports = {
  getMap : getMap,
  randomRange : randomRange,
  postMessage : postMessage
};
