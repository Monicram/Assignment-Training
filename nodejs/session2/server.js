const http = require('http')
const fs = require('fs')
const path = require('path')
const os = require('os')

const filePath = path.join(__dirname, 'data.json')

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200)
    res.end(JSON.stringify(users))

  } else if (req.method === 'GET' && req.url === '/users/top') {
    const topUsers = users.filter(user => user.score >= 90)
    res.writeHead(200)
    res.end(JSON.stringify(topUsers))

  } else if (req.method === 'GET' && req.url.startsWith('/users/')) {
    const id = parseInt(req.url.split('/')[2])

    const user = users.find(user => user.id === id)

    if (user) {
      res.writeHead(200)
      res.end(JSON.stringify(user))
    } else {
      res.writeHead(404)
      res.end(JSON.stringify({ error: 'User not found' }))
    }
    

  }else if (req.method === 'GET' && req.url === '/health') {
  const health = {
    status: 'ok',
    platform: os.platform(),
    memory: {
      totalMB: Math.round(os.totalmem() / 1024 / 1024),
      freeMB: Math.round(os.freemem() / 1024 / 1024)
    },
    uptime: process.uptime()
  }

  res.writeHead(200)
  res.end(JSON.stringify(health))
} else {
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Route not found' }))
  }
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})


/*
users
[{"id":1,"name":"Rahul","role":"intern","score":85},{"id":2,"name":"Priya","role":"intern","score":92},{"id":3,"name":"Amit","role":"intern","score":78},{"id":4,"name":"Sneha","role":"intern","score":95},{"id":5,"name":"Vikram","role":"intern","score":88}]

users/1
{"id":1,"name":"Rahul","role":"intern","score":85}

users/top
[{"id":2,"name":"Priya","role":"intern","score":92},{"id":4,"name":"Sneha","role":"intern","score":95}]

users/10
{"error":"User not found"}

users/anything
{"error":"User not found"}

health
{"status":"ok","platform":"win32","memory":{"totalMB":16028,"freeMB":4784},"uptime":33.6841836}
*/