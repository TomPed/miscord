'use strict';

var random = ['./audio/duh1.mp3', './audio/duh2.mp3', './audio/duh3.mp3'];
var randomNumber = random.length;
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
  localMap.set('.bag', ['https://hydra-media.cursecdn.com/dota2.gamepedia.com/e/ee/Wdoc_inthebag_01.mp3', '.125']);
  localMap.set('.gg', ['./audio/gg.mp3', '.25']);
  localMap.set('.dp', ['http://hydra-media.cursecdn.com/dota2.gamepedia.com/b/b4/Dpro_wailing_03.mp3', '.125']);
  localMap.set('.lion', ['http://hydra-media.cursecdn.com/dota2.gamepedia.com/4/4a/Lion_respawn_01.mp3', '.125']);
  localMap.set('.cheers', ['https://my.mixtape.moe/dcvdxs.wav', '.5']);
  localMap.set('.random', [random[randomRange(randomNumber)], '1.2']);
  return localMap;
}

/**
 * Posts a message to the server.
 *
 * @param {Object} message The given message
 * @param {Object} channel Then given channel
 * @param {Object} bot The given bot Client
 */
function postMessage(message, channel, bot) {
  bot.sendMessage(channel, message);
}

module.exports = {
  getMap: getMap,
  randomRange: randomRange,
  postMessage: postMessage
};
