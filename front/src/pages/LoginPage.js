import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { loginUserService } from '../services';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const {login} = useContext(AuthContext);
	const navigate = useNavigate();

	const handleForm = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const data = await loginUserService({ email, password });
			login(data);
			navigate("/");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		
		<main>
			<section className="content">
				<h1>Login</h1>
			<form onSubmit={handleForm}>
				<fieldset>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' name='email' required onChange={(e) => setEmail(e.target.value)} />
				</fieldset>
				<fieldset>
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' name='password' required onChange={(e) => setPassword(e.target.value)} />
				</fieldset>
				<button>LOGIN</button>
				{error ? <p>{error}</p> : null}
			</form>
			</section>
			</main>
	);
};
