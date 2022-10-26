const { getConnection } = require('../DDBB/db');
const { generateError } = require('../helpers');

const newVote = async (user_id, comment_id, vote) => {
  let connection;
  console.log(user_id+"-"+ comment_id+"-"+vote)

  try {
    connection = await getConnection();
    // imprescindible comprobar que el usuario no haya votado ya ese comentario.
    const [formervote] = await connection.query(
      `
      SELECT vote FROM votes WHERE user_id = ? AND comment_id = ?
      `,
      [user_id, comment_id]
    );
    if (formervote.length > 0) {
      const [removevote] = await connection.query(
        `
        DELETE FROM votes WHERE user_id = ? AND comment_id = ?
        `,
        [user_id, comment_id]
      );
      return "User vote for quote ID: "+comment_id+" succesfully removed";
    } else {

    const [result] = await connection.query(
      `
        INSERT INTO votes (user_id, comment_id, vote)
        VALUES (?, ?, ?)
        `,
      [user_id, comment_id, vote]
    );
    return "Vote with id: "+result.insertId+" succesfully created";
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  newVote,
};