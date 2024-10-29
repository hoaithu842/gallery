import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { fetchPhotoDetails } from '../api';
import './PhotoDetail.css';

function PhotoDetail() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPhotoDetail = async () => {
            setLoading(true);
            try {
                const response = await fetchPhotoDetails(id);
                setPhoto(response.data);
            } catch (error) {
                console.error("Error fetching photo details:", error);
            }
            setLoading(false);
        };

        loadPhotoDetail();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!photo) {
        return <p>Photo not found</p>;
    }

    return (
        <div className="photo-detail-container">
            <div className="photo-image-container">
                <img src={photo.urls.full} alt={photo.alt_description || "Photo"} className="photo-detail-image" />
                <a href={photo.user.links.html} target="_blank" rel="noopener noreferrer" className="view-profile-link">
                    View {photo.user.name}'s profile on Unsplash
                </a>
            </div>

            <div className="photo-detail-info">
                <h2>{photo.alt_description || "Untitled"}</h2>
                <p><strong>Author:</strong> {photo.user.name} ({photo.user.username})</p>
                <p><strong>Description:</strong> {photo.description || "No description available."}</p>
                <p><strong>Location:</strong> {photo.location ? `${photo.location.city}, ${photo.location.country}` : "Unknown"}</p>
                <p><strong>Downloads:</strong> {photo.downloads}</p>
                <p><strong>Likes:</strong> {photo.likes}</p>

                {/* Display EXIF data if available */}
                {photo.exif && (
                    <>
                        <h3>EXIF Data</h3>
                        <p><strong>Camera:</strong> {photo.exif.name}</p>
                        <p><strong>Exposure Time:</strong> {photo.exif.exposure_time}s</p>
                        <p><strong>Aperture:</strong> ƒ/{photo.exif.aperture}</p>
                        <p><strong>Focal Length:</strong> {photo.exif.focal_length}mm</p>
                        <p><strong>ISO:</strong> {photo.exif.iso}</p>
                    </>
                )}

                {/* Tags */}
                <h3>Tags</h3>
                <div className="tags">
                    {photo.tags.map((tag) => (
                        <span key={tag.title} className="tag">{tag.title}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PhotoDetail;