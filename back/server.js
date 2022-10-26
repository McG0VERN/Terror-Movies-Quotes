'use strict';
require('dotenv').config(); // carga las variables de entorno. Nos deja acceder a .env

const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Ayuda a registrar las solicitudes HTTP para su seguimiento y pruebas.

const {
  // objeto copiado de users.js para exportarlo aquí.
  newUserController,
  getUserController,
  loginController,
  editUserController,
} = require('./controllers/users');

const {
  // objeto copiado de comments.js para exportarlo aquí.
  getCommentController,
  newCommentController,
  getSingleCommentController,
  deleteCommentController,
  votesCounterController,
} = require('./controllers/comments');

const { authUser } = require('./middlewares/auth');

const {
  // objeto copiado de votes.js para exportarlo aquí.
  newVoteController,
} = require('./controllers/votes');

const app = express(); //donde definimos los middleware y para que escuche en un puerto (listen),permitiendo que escuche peticiones http, pasándola por todos los middelware y rutas que se defina.
app.use(express.json()); //Permite procesar lo que hay en el body de las peticiones. Por defecto express no lo hace.
app.use(morgan('dev'));
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

//RUTAS- ENDPOINTS.

//rutas de usuario

app.post('/user', newUserController); //Registro usuario
app.get('/user', authUser, getUserController); // Devuelve info  del usuario
app.get('/user/:id',  getUserController);
app.post('/user/login', loginController); // Login de usuario. Devuelve token
app.put('/userdetailsedit', authUser, editUserController); // modificación del usuario.

//rutas de comments

app.post('/comment', authUser, newCommentController); // Permite crear un comment
app.get('/', getCommentController); // lista todos los comments
app.get('/comment/:id', getSingleCommentController); // Devuelve un comment.
app.delete('/comment/:id', authUser, deleteCommentController); // Borra un comment, pero solo si eres tú el que lo ha cread
app.post('/comment/vote', authUser, newVoteController); //permite votar crear un voto  sobre un comment.
app.get('/comment/votescounter/:id', votesCounterController); //permite contabiliar los votos de un comentario.

//MIDDLEWARE 404. Gestiona peticiones que no caen en ninguna ruta.

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'not found',
  });
});

//MIDDLEWARE de gestión de errores. Gestionarpeticiones que aunque cayeron en ruta generaron error.

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el servidor
app.listen(3000, () => {
  console.log('Server on duty: working! :) ');
});
