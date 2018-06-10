const app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const reqHandler = nextApp.getRequestHandler()

nextApp.prepare()
    .then(() => {
        app.get('*', (req, res) => {
            return reqHandler(req, res)
        });

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        });
    });