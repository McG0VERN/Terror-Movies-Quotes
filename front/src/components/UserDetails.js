import React from 'react';


export const UserDetails = ({user}) => {
	return (
		
		<section className= "content">
				<h1>User Details</h1>
				<p> {user.name}</p>
				<p>Member from: {new Date(user.created_at).toLocaleDateString()}</p>
			</section>
			
	);
};
