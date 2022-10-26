import React from 'react';
import './App.css';



import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CommentAddPage } from './pages/CommentAddPage';
import {CommentDetailsPage} from './pages/CommentDetailsPage';
import { UserDetailsPage } from './pages/UserDetailsPage';
import { UserDetailsEditPage } from './pages/UserDetailsEditPage';

function App() {
	return (
		<main className='app'>	
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/user/:id' element={<UserDetailsPage />} />
				<Route path='/userdetailsedit' element={<UserDetailsEditPage/>} />
				<Route path='/comment/:id' element={<CommentDetailsPage/>} />
				<Route path="/commentadd" element={<CommentAddPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</main>
	);
}

export default App;
