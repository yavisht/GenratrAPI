const zlib = require("zlib");

/**
 * Compresses a JavaScript object into Brotli-compressed JSON.
 *
 * @param {Object} data - The data object to compress.
 * @param {Function} callback - Standard Node.js callback (err, result).
 */
function compressJson(data, callback) {
  // Convert object to JSON string, then to a buffer
  const buffer = Buffer.from(JSON.stringify(data));

  // Compress using Brotli algorithm (fast & efficient for text)
  zlib.brotliCompress(buffer, callback);
}

module.exports = { compressJson };
