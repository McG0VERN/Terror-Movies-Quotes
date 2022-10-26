import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {deleteCommentService} from '../services';
import LikeButton from './LikeButton';


export const Comment = ({comment, removeComment}) => {
	const {user, token} = useContext(AuthContext);
	const [error, setError] = useState("");
	
	const deleteComment = async (id) => {

		try {
			await deleteCommentService({id, token}); 
			removeComment(id); 
		} catch(error) {
			setError (error.message)
		}

	};
	return (
		<article>
			<p> <Link  className= "title" to={`/comment/${comment.id}`}>{comment.title}</Link></p>
			<p className= "comment"> {comment.text}</p>
			<p className= "commentdetails">
				By <Link className= "author" to= {`/user/${comment.user_id}`}>{comment.name} 
				</Link> on {''}
				{new Date(comment.created_at).toLocaleDateString()}
				
			</p>
		
			{user && user.id === comment.user_id ? (
				<section>
					<button className='confirm'  onClick ={() => {
						if (window.confirm ("Do you really want to delete de comment?"))
						deleteComment(comment.id)
					}}>Delete Quote < span role="img" aria-label = "skull"> ☠   </span> </button>
					{error ? <p>{error}</p> : null}
						</section>) : null}
		<LikeButton id={comment.id}/>
		</article>
	);
};
