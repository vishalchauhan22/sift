/**
 *
 * @param {any} input
 * @returns {Blob}
 */
function toJsonBlob(input) {
  return new Blob([JSON.stringify(input)], {
    type: 'application/json',
  });
}

module.exports = toJsonBlob;
