const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const clases = require('./routes/clases');
const usuarios_clases = require('./routes/usuario_clases');
const usuario_cursos = require('./routes/usuario_curso');
const notificaciones = require('./routes/notificaciones');
const Files = require('./routes/Files');
app.set('port', process.env.PORT || 3883);
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'https://learnwithus.vercel.app','Access-Control-Allow-Origin':'https://learnwithus.vercel.app'}));
app.use(cors({origin: '*','Access-Control-Allow-Origin':'*'}));
app.use(cors({origin: "*",'Access-Control-Allow-Origin':"*"}));
app.use('/Usu', usuarios);
app.use('/Cur', cursos);
app.use('/Cla', clases);
app.use('/UsuCla', usuarios_clases);
app.use('/UsuCur', usuario_cursos);
app.use('/Not', notificaciones);
app.use('/Fil', Files)
app.listen(app.get('port'), () => {
    console.log('server on port' + app.get('port'));
});
