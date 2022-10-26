const { generateError } = require('../helpers');
const { getConnection } = require('../DDBB/db');

const deleteCommentsById = async (userId, id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE  FROM comments WHERE id = ? AND user_id = ?
        `,
      [id, userId]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getCommentVotes = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT COUNT(vote) as votes 
      FROM comments c 
      LEFT JOIN votes v ON c.id=v.comment_id 
      WHERE c.id=?;
        `,
      [id]
    );
    if (result.length === 0) {
      throw generateError(`Comment with id: ${id} does not exist`, 404);
    }
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getAllCommentsById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT c.*, u.name FROM comments c left join users u on c.user_id=u.id WHERE c.id=?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`Comment with id: ${id} does not exist`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllComments = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(`
        SELECT c.*, u.name FROM comments c left join users u on c.user_id=u.id ORDER BY created_at DESC
        `);
    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createComment = async (userId, title, text) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO comments (user_id, text, title) VALUES (?,?,?)
        `,
      [userId, text, title]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  // exportación a controllers/comments.js
  createComment,
  getAllComments,
  getAllCommentsById,
  deleteCommentsById,
  getCommentVotes,
};
