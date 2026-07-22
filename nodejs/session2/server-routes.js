const http = require('http')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Home</title>
      </head>
      <body>
        <h1>Welcome to Node.js</h1>
        <p>This page is served using HTML.</p>
      </body>
    </html>
  `)
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('About page')

  } else if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }))

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 — Page not found')
  }
})

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001')
})

/*
process.uptime() → returns the server's running time (in seconds).
Content-Type: application/json → tells the browser that the response data is JSON.

{"status":"ok","uptime":34.0621927}
*/