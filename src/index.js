const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require('http');
const { setupWebSocket } = require('./websocket')
const porta = 3333;
const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://pedro:pedro@cluster0-ck0sx.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(express.json())
app.use(routes);



server.listen(porta);
console.log('ouvindo na porta: ', porta);


