import { useEffect, useState } from 'react';
import { getSingleCommentService } from '../services';

const useComment = (id) => {
	const [comment, setComment] = useState([null]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	// Esta función nos servirá en el Home Page.

	useEffect(() => {
		const loadComment = async () => {
			try {
				setLoading(true);
				const data = await getSingleCommentService(id);

				setComment(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadComment();
	}, [id]);

	return { comment, loading, error };
};

export default useComment;
