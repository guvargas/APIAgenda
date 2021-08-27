let express = require('express');
let routes = express.Router();

routes.get('/', (req, res) =>{
    res.end('Página inicial')
 });

 module.exports = routes;