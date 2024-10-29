import React from 'react';
import { Link } from 'react-router-dom';

function PhotoCard({ photo }) {
    return (
        <div className="photo-card">
            <Link to={`/photos/${photo.id}`}>
                <img src={photo.urls.thumb} alt={photo.alt_description} />
                <p>{photo.user.name}</p>
            </Link>
        </div>
    );
}

export default PhotoCard;
