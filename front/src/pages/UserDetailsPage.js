import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import useUser from '../hooks/useUser';
import { UserDetails} from '../components/UserDetails';

export const UserDetailsPage = () => {
	const { id } = useParams();

	const { user, loading, error } = useUser(id);

	if (loading) return <p> Loading user...</p>;
	if (error) return <ErrorMessage message={error} />;

	return (
		
		<section >
			<UserDetails user={user} />
		</section>
		
	);
};
