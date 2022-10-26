import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {deleteCommentService} from '../services';
import LikeButton from './LikeButton';


export const CommentDetails = ({comment, removeComment}) => {
	const navigate = useNavigate();
	const {user, token} = useContext(AuthContext);
	const [error, setError] = useState("");
	
	const deleteComment = async (id) => {

	try {
			await deleteCommentService({id, token}); 
			if(removeComment) {
				removeComment(id);
			} else {
				navigate("/");
			}
		} catch(error) {
			setError (error.message)
		}

	};
	return (
		<section className= "content">
            <h1> {comment.title}</h1>
            			<p> {comment.text}</p>
			<p>
				By  <Link to= {`/user/${comment.user_id}`}>{comment.name} 
				</Link> on {''}
				{new Date(comment.created_at).toLocaleDateString()}
			</p>

			{user && user.id === comment.user_id ? (
				<section>
					<button onClick={() => {
						if (window.confirm ("Are you sure?"))
						deleteComment(comment.id)
					}}>Delete Quote< span role="img" aria-label = "cross">❌ </span>  </button>
					{error ? <p>{error}</p> : null}
						</section>) : null}
		
		<LikeButton id={comment.id}/>
			</section>
	);
};
