const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const {
  createUser,
  getUserById,
  getUserByEmail,
  editUser,
} = require('../DDBB/usersdb');

const newUserController = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      throw generateError('Name and email are compulsory fields', 400);
    }
    const id = await createUser(email, name, password);

    res.send({
      status: 'OK',
      message: `User created with id : ${id}`,
    });
  } catch (error) {
    next(error); //lanza la peticion al siguiente middelware definido--- Al haber un8 error), lo pasa al gestor de errores en server.js
  }
};
const getUserController = async (req, res, next) => {
  var id;
  if(req.params.id) {
    id = req.params.id;
  }  else {
    id = req.userId;
  }
  try {
    const user = await getUserById(id);
    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const editUserController = async (req, res, next) => {
  try {
    const {password, name} = req.body

    if (password || !name) {
      await generateError(
        'Invalid data required fields password and name',
        401
      );
    }

    const UpdateUser = await editUser(req.userId, name, password);
    res.send({
      status: 'ok',
      data: {
        UpdateUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw generateError('Email and password are required', 400);
    }

    // Recogemos de la DDBB  los datos del usuario con ese mail
    const user = await getUserByEmail(email);

    // Comprobación de contraseñas  (Sino Error)
    const validPassword = await bcrypt.compare(password, user.password); // esto da true si coinciden y tienen el mismo HASH
    if (!validPassword) {
      throw generateError('Incorrect password', 401);
    }

    // Creación del PAYLOAD del token

    const payload = { id: user.id };

    // Firma del token

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
    });

    // Envío del token

    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // cogemos este objeto  y lo copiamos en server.js que es donde se importa.
  newUserController,
  getUserController,
  loginController,
  editUserController,
};
