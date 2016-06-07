'use strict';

/**
 * Gets a random integer between zero to the given parameter.
 *
 * @param {Number} range The given range
 * @returns {number} The random integer
 */
function randomRange(range) {
  return Math.floor(Math.random() * range);
}

module.exports = randomRange;
