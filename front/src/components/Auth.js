import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export const Auth = () => {
	const { user, logout} = useContext(AuthContext);

	return user ? (
		<ul>
			<li><Link to='/userdetailsedit'>{user.email}  </Link></li>
			<li><Link onClick={() => logout()}>LogOut </Link></li>
			 
		</ul>	
	) :(
		<ul>
			<li>
				<Link to='/register'>Register </Link>
			</li>
			<li>
				<Link to='/login'>Login </Link>
				</li>
		</ul>
	);
};
