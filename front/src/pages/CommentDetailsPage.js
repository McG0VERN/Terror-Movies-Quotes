import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import useComment from '../hooks/useComment';
import { CommentDetails} from '../components/CommentDetails';

export const CommentDetailsPage = () => {
	const { id } = useParams();

	const { comment, loading, error } = useComment(id);

	if (loading) return <p> Loading comment...</p>;
	if (error) return <ErrorMessage message={error} />;

	return (
		<section >
			<CommentDetails comment={comment} />
		</section>
	);
};
