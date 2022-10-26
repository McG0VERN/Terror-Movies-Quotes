import React from "react";

import { Link } from 'react-router-dom';

 export const NotFoundPage = () => {
    return (
        <section>
            <h1>404 Not found</h1>
            <Link to  ="/" >Go to HomePage</Link>
            
        </section>
    );
};