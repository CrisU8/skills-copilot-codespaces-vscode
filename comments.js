// create web server
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const { url, method } = req

    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('500 - Internal Server Error')
                return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === '/comments' && method === 'GET') {
        fs.readFile('./comments.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('500 - Internal Server Error')
                return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
        })
    } else if (url === '/comments' && method === 'POST') {
        let body = []

        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            fs.readFile('./comments.json', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' })
                    res.end('500 - Internal Server Error')
                    return
                }
                const comments = JSON.parse(data)
                comments.push(JSON.parse(body))
                fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('500 - Internal Server Error')
                        return
                    }
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(comments))
                })
            })
        })
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('404 - Not Found')
    }
})

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000/')
})

// Path: index.html
<!DOCTYPE html>
<html lang="en">
