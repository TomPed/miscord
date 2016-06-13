'use strict';

var FastMap = require('collections/fast-map');
var fs = require('fs');
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

function dirToArray(dir) {
  var dirArray = [];
  fs.readdir(dir, function (err, files) {
    if (!err) {
      for (var i = 0; i < files.length; i++) {
        dirArray.push(dir + files[i]);
        console.log(dir + files[i]);
      }
    }
    else {
      throw err;
    }
  });
  return dirArray;
}


module.exports = {
  getMap : getMap,
  randomRange : randomRange,
  dirToArray : dirToArray
};
