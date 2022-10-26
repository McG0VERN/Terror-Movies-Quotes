import React from 'react';
import { Auth } from './Auth';
import {Link} from 'react-router-dom';


export const Header = () => {
        return (
                <>
                <header>
                        <Link to = "/">
                                <h1>Terror Movies Quotes</h1>
                                </Link>       
                                
                         <video controls autoplay  src="/music.mp3"></video>    
                        <nav><Auth /></nav>
                </header>                                                                                                                                
                </>
	);
};
