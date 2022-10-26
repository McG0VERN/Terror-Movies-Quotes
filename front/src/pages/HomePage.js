import React, {useContext} from 'react';
import useComments from '../hooks/useComments';
import CommentList from '../components/CommentList';
import { ErrorMessage } from '../components/ErrorMessage';
import {AuthContext} from '../Context/AuthContext';
import App from '../App';




export const HomePage = () => {
	const {comments, loading, error,removeComment} = useComments();
	const {user} = useContext(AuthContext);

	if (loading) return <p> Loading quotes...</p>;
	if (error) return <ErrorMessage message={error} />;

	return (
		<main>
			{/* <video controls src="/video.mp4" ></video>       */}
				
			<section className="content">
			
			<h1>Latest Quotes </h1>
			{user ?
			
				<p> 			
					<button className= "addquote"
   					 type="button"
   					 onClick={(e) => {
     				 e.preventDefault();
     				 window.location.href='/commentadd';
    				  }}
					> Add Quote</button>
				</p>:null}  
			<CommentList comments={comments} removeComment={removeComment}></CommentList>		
			
			</section>
			</main>
			
	);
};
