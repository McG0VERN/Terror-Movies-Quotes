import { useEffect, useState } from 'react';
import { getUserEditGetService } from '../services';

const useUserEditGet = (token) => {
	const [user, setUser] = useState([null]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	// Esta función nos servirá en el Home Page.

	useEffect(() => {
		const loadUser = async () => {
			try {
				setLoading(true);
                const data = await getUserEditGetService(token);
				setUser(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, [token]);

	return { user, loading, error };
};

export default useUserEditGet