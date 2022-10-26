import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProviderComponent } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProviderComponent>
				<App />
			</AuthProviderComponent>
		</BrowserRouter>
	</React.StrictMode>,
);
