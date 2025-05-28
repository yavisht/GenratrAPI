const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// Absolute path to the index.html file
const indexPath = path.join(__dirname, "..", "index.html");

let indexHtmlCompressed = null;

// Load and compress the HTML file once at startup (synchronously)
try {
  const html = fs.readFileSync(indexPath); // Read HTML from disk
  indexHtmlCompressed = zlib.brotliCompressSync(html); // Compress it using Brotli
} catch (err) {
  // If HTML fails to load, log the error (API will return 503 later)
  console.error("Failed to preload index.html:", err);
}

// Headers for serving compressed HTML
const HTML_HEADERS = {
  "Content-Type": "text/html",
  "Content-Encoding": "br", // Brotli compression
  "Cache-Control": "public, max-age=3600", // Allow caching for 1 hour
};

// Headers for API JSON responses
const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Content-Encoding": "br",
  "Access-Control-Allow-Origin": "*", // Enable CORS
  "X-Content-Type-Options": "nosniff", // Prevent MIME sniffing
  "X-Frame-Options": "DENY", // Block iframing
  "X-XSS-Protection": "1; mode=block", // Enable basic XSS protection
  "Cache-Control": "no-store", // Don’t cache dynamic password responses
};

module.exports = {
  indexHtmlCompressed,
  HTML_HEADERS,
  JSON_HEADERS,
};
