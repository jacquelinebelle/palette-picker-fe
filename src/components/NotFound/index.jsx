import React from 'react';
import where from '../../assets/404.svg';
import './NotFound.scss';

export const NotFound = () => {

    return (
        <article className="container not-found-page">
            <h2>Not found!</h2>
            <img className="where" src={where} />
        </article>
    )
}

export default NotFound;