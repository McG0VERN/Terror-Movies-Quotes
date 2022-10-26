import { useEffect, useState } from 'react';
import { getCountCommentVotesService } from '../services';

const useCountCommentVotes = (id) => {
	const [votes, setCountCommentVotes] = useState([null]);
    const [error, setError] = useState('');
    
	useEffect(() => {
		const loadCountCommentVotes = async () => {
			try {
                const data = await getCountCommentVotesService(id);
				votes = data[0].votes
			} catch (error) {
				setError(error.message);
			}
		};

		loadCountCommentVotes();
	}, []);

	return { votes, error };
};

export default useCountCommentVotes;