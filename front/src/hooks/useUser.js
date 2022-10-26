import { useEffect, useState } from 'react';
import { getUserDetailsService } from '../services';

const useUser = (id) => {
	const [user, setUser] = useState([null]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	// Esta función nos servirá en el Home Page.

	useEffect(() => {
		const loadUser = async () => {
			try {
				setLoading(true);
                const data = await getUserDetailsService(id);
				setUser(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, [id]);

	return { user, loading, error };
};

export default useUser;
