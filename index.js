const express = require('express');
let routeHome = require('./rotas/home');
let routeContato = require('./rotas/contato')
let routeUsuario = require('./rotas/usuario');
let routeCompromisso = require('./rotas/compromisso');

const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routeHome);
app.use(routeContato);
app.use(routeUsuario);
app.use(routeCompromisso);

app.listen(4000, '0.0.0.0', () => {
    console.log('servidor rodando');
})