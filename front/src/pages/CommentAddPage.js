import React, { useContext, useState} from "react";
import {sendCommentService} from "../services";
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CommentAddPage = ({addComment}) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const {token} = useContext(AuthContext);

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setSending(true);
            addComment = await sendCommentService ({title, text, token});
			navigate("/");

        } catch(error) {
            setError(error.message);
            
        } finally {
            setSending(false);
        }
    }
 if (!token) {
		navigate("/")
	} else {
    
     return (
        <main>
    <section className="content">           
    <h1> Add a New Quote</h1> 
    <form onSubmit={handleForm}>              
        <fieldset>
            <label htmlFor="title">Movie</label>
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)}/>
        </fieldset>
        
        <fieldset>
            <label htmlFor="text">Quote</label>
                    <textarea id="text" name="text" 
                        required onChange={(e) => setText(e.target.value)} />
        </fieldset>
        <button>Send Quote</button>
        {sending ? <p>Sending quotes</p> : null}
        {error ? <p>{error}</p> : null}
    </form>
             </section>
             </main>
    )
	}
};