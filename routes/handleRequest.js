const url = require("url");
const genratr = require("../lib/genratr");
const {
  HTML_HEADERS,
  JSON_HEADERS,
  indexHtmlCompressed,
} = require("../utils/html");
const { compressJson } = require("../utils/compress");

module.exports = function handleRequest(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.writeHead(405, JSON_HEADERS);
    return res.end(`{"error":"Method Not Allowed"}`);
  }

  // Parse request URL and query params
  const { pathname, query } = url.parse(req.url, true);

  // Serve index.html from memory if root path and no query params
  if (pathname === "/" && Object.keys(query).length === 0) {
    // If HTML wasn't preloaded properly
    if (!indexHtmlCompressed) {
      res.writeHead(503, { "Content-Type": "text/plain" });
      return res.end("Service Unavailable");
    }

    // Return compressed HTML with headers
    res.writeHead(200, HTML_HEADERS);
    return res.end(indexHtmlCompressed);
  }

  // Generate password based on query params
  const password = genratr(query);

  // Return 400 if generation fails (e.g. invalid or missing character sets)
  if (!password) {
    res.writeHead(400, JSON_HEADERS);
    return res.end(`{"error":"Invalid request"}`);
  }

  // Compress and return JSON response
  compressJson({ password }, (err, compressed) => {
    if (err) {
      res.writeHead(500, JSON_HEADERS);
      return res.end(`{"error":"Compression failed"}`);
    }

    // Success response with Brotli-compressed JSON
    res.writeHead(200, JSON_HEADERS);
    res.end(compressed);
  });
};
