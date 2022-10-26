import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { likeCommentService } from '../services';
import { getCountCommentVotesService } from '../services';




const LikeButton = ({id}) => {
  const {token} = useContext(AuthContext);
  const [LikeClicked, setLikeClicked] = useState(false);	
  const [error, setError] = useState('');
  const [votes, setVotes] = useState('');

  const loadCountCommentVotes = async () => {
    try {
      const data = await getCountCommentVotesService(id);
      setVotes(data[0].votes)
    } catch (error) {
      setError(error.message);
    }
  };

  loadCountCommentVotes();
  const handleLike = async (e) => {
    try {
      if(!localStorage.getItem("token")){
        setError("You must be registered to be allowed to vote quotes");
      } else {
      if(LikeClicked) {
        await likeCommentService({ token, id, vote:0 });
        setVotes(votes - 1);
      } else {
        await likeCommentService({ token, id, vote:1 });
        setVotes(votes + 1);
      }
      setLikeClicked(!LikeClicked);
    }
    } catch (error) {
      setError(error.message);
    }
    
  };
  
  return (<section><p>
    <button className={ `like-button ${LikeClicked && 'liked'}` } onClick={handleLike}>
      <span className="likes-counter">{ `Likes ${votes ? votes : 0}` }</span>
    </button>
    </p>
    {error ? <p>{error}</p> : null}
    </section>
  );
};

export default LikeButton;