import React from 'react';
import PhotoCard from './PhotoCard';
import Loading from './Loading'; // Import LoadingSpinner
import './PhotoGrid.css';

function PhotoGrid({ photos, loading }) {
    return (
        <div className="photo-grid">
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
            {loading && <Loading />}
        </div>
    );
}

export default PhotoGrid;