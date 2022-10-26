import React, {useContext, useState} from "react";
import {userDetailsEditService} from '../services';
import { AuthContext } from '../Context/AuthContext';
import useUserEditGet from '../hooks/useUserEditGet';


export const UserDetailsEditPage = () => {
	const {token} = useContext(AuthContext);
	const { user, loading, erroruser } = useUserEditGet(token);
	const [pass1, setPass1] = useState('');
	const [pass2, setPass2] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState("");

	const handleForm = async (e) => {
		e.preventDefault();
		setError('');
		if (pass1 !== pass2) {
			setError('Passwords do not match.');
			return;
		}

		try {
			const name = e.target.name.value;
			await userDetailsEditService({ token, name, password: pass1 });
		    setMessage ("User details updated")
		} catch (error) {
			setError(error.message);
		}
	};

	if(loading) return <p> Loading user...</p>;
	
	return (
		<main>
		<section className="content">
			<h1>Account Details</h1>

			<form onSubmit={handleForm}>
				<fieldset className="mail">
					<label htmlFor='email'>Email</label>
					{user.email}
				</fieldset>

				<fieldset>
					<label htmlFor='name'>Name</label>
					<input  defaultValue={`${user.name}`} type='text' id='name' name='name' required />
				</fieldset>

				<fieldset>
					<label htmlFor='pass1'>Password</label>
					<input type='password' id='pass1' name='pass1' onChange={(e) => setPass1(e.target.value)} />
				</fieldset>

				<fieldset>
					<label htmlFor='pass2'>Repeat Password</label>
					<input type='password' id='pass2' name='pass2' onChange={(e) => setPass2(e.target.value)} />
				</fieldset>
				<button>UPDATE</button>
				{error ? <p>{error}</p> : null}
				{erroruser ? <p>{erroruser}</p> : null}
				{message ? <p>{message}</p> : null}
			</form>
		</section>
		</main>
	);
};
