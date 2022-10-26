import React from 'react';
import { useParams } from 'react-router-dom';
import { Comment } from '../components/Comment';
import { ErrorMessage } from '../components/ErrorMessage';
import useComment from '../hooks/useComment';

export const CommentPage = () => {
	const { id } = useParams();

	const { comment, loading, error } = useComment(id);

	if (loading) return <p> Loading quote...</p>;
	if (error) return <ErrorMessage message={error} />;

	return (
		<section>
			<h1>Quote</h1>
			
			<Comment comment={comment} />
		
		</section>
	);
};
