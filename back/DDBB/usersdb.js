const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('../DDBB/db');

const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM users WHERE email=? 
      `,
      [email]
    );
    if (result.lenght === 0) {
      throw generateError('No user found with this mail', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// Edicion del campo email, nombre, password

const editUser = async (id, name, password) => {
  let connection;
  const passwordHash = await bcrypt.hash(password, 8);
  try {
    connection = await getConnection();
    const [editUser] = await connection.query(
      `
    UPDATE users SET   password=?, name=? WHERE id=?;
    `,
      [ passwordHash, name, id]
    );

    return editUser;
  } finally {
    if (connection) connection.release();
  }
};

// devuelve la información pública de un usuario por su id

const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM users WHERE id=? 
            `,
      [id]
    );
    if (result.lenght === 0) {
      throw generateError('No user found with this mail ID', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//CREAR USUARIO. Requiere de 4 pasos.

//1. Crear un usuario en la DDBB y devuelve su ID
const createUser = async (email, name, password) => {
  // recibe un mail y una password
  let connection; // crea una conexion

  try {
    connection = await getConnection(); // consigue una conexion real a DDBB
    //2. Comprobar que no exista otro usuario con ese mail
    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?
    `,
      [email]
    );

    if (user.lenght > 0) {
      throw generateError(
        'This email address is already used by another user',
        409
      );
    }

    //3. Encriptar password
    const passwordHash = await bcrypt.hash(password, 8);

    // 4. Crear el usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email, password, name) VALUES (?,?,?)
`,
      [email, passwordHash, name]
    );

    // 5. Devolver un id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  editUser,
  getUserById,
  getUserByEmail,
};
