import { useEffect, useState } from 'react';
import { getAllCommentsService } from '../services';

const useComments = () => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	// Esta función nos servirá en el Home Page.

	useEffect(() => {
		const loadComments = async () => {
			try {
				setLoading(true);
				const data = await getAllCommentsService();

				setComments(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadComments();
	}, []);

	const addComment = (comment) => {
		setComments({comment, ...comments});
	};

	const removeComment = (id) => {
		setComments(comments.filter((comment) => comment.id !== id));
	};
	return { comments, loading, error, addComment , removeComment} ;
};

export default useComments;
