import React from 'react';
import { Comment } from './Comment';

const CommentList = ({ comments, removeComment}) => {
	return comments.length ? (
		<ul>
			{comments.map((comment) => (
				<li key={comment.id}>
					<Comment comment={comment} removeComment={removeComment} />
				
				</li>
			))}
		</ul>
	) : (
		<p>No quotes here yet... </p>
	);
};
export default CommentList;
