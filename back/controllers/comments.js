const {
  createComment,
  getAllComments,
  getAllCommentsById,
  deleteCommentsById,
  getCommentVotes,
} = require('../DDBB/commentsdb');

const { generateError } = require('../helpers');

const getCommentController = async (req, res, next) => {
  try {
    const comments = await getAllComments();
    res.send({
      status: 'ok',
      data: comments,
    });
  } catch (error) {
    next(error); 
  }
};
const newCommentController = async (req, res, next) => {
  try {
    const { title, text } = req.body;

  
    if (!title  || !text) {
      throw generateError("'title' and 'text' are required fields", 400);
    }
    const id = await createComment(req.userId, title, text);

    res.send({
      status: 'ok',
      message: `Comment with id: ${id} succesfully created`,
    });
  } catch (error) {
    next(error);
  }
};

const votesCounterController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const votes = await getCommentVotes(id);

    res.send({
      status: 'ok',
      data: votes,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await getAllCommentsById(id);
    res.send({
      status: 'ok',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Conseguir info del comment a borrar
    const comment = await getAllCommentsById( id);

    // Comprobar que el user del token es el mismo que creó el comment

    if (req.userId !== comment.user_id) {
      throw generateError('Can not delete comment. Check your user.', 401);
    }

    //Borrar el comment

    await deleteCommentsById(req.userId,id);

    res.send({
      status: 'Ok',
      message: `Comment with id: ${id}  succesfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // exportación a server.js
  getCommentController,
  newCommentController,
  getSingleCommentController,
  deleteCommentController,
  votesCounterController,
};
