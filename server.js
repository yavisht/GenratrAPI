const http = require("http");
const handleRequest = require("./routes/handleRequest");

// Define the port to listen on (defaults to 8080 if not set in environment)
const PORT = process.env.PORT || 8080;

// Create and start the HTTP server using the custom request handler
http.createServer(handleRequest).listen(PORT, () => {
  console.log(`🚀 GenratrAPI running on http://localhost:${PORT}`);
});
