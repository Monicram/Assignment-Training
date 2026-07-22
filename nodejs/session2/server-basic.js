const http = require('http')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

// req (request) contains information sent by the client, such as the URL, HTTP method, and headers.
// res (response) is used by the server to send data and status back to the client.

// req.method contains the HTTP method used by the client (GET, POST).
// req.url contains the URL or path requested by the client (/, /about, /users).