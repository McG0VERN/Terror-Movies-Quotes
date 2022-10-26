const {getAllCommentsById} = require('../DDBB/commentsdb');
const { newVote } = require('../DDBB/votesdb');
const { generateError } = require('../helpers');

const newVoteController = async (req, res, next) => {
  try {
    const {vote, id} = req.body;
    if(!id) {
      throw generateError(
        'comment_id is required',
        400
      );
    }
    const comment = await getAllCommentsById(id);
    if(comment.user_id == req.userId) {
     
        throw generateError(
        'you cannot vote your own quote',
        400
      );

    } else {
      const msg = await newVote(req.userId, id, vote);
      res.send({
        status: 'ok',
        message: msg,
      });
    }
    } catch(error) {
      next(error);
    }
  
  
};


module.exports = {
  newVoteController,
};