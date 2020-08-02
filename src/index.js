const express = require ('express');
const morgan = require ('morgan');

//inicializacion
const app = express();

//configs
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));

//variables globales

//routes
app.use(require('./routes'))
//public

//lanzar servidor
app.listen(app.get('port'), () => {
    console.log('El servidor se ejecuta en el puerto', app.get('port'));
})
