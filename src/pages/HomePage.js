import React, {useState, useEffect, useCallback} from 'react';
import PhotoGrid from '../components/PhotoGrid';
import { fetchPhotos } from '../api';
import Loading from '../components/Loading';

function HomePage() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [endOfList, setEndOfList] = useState(false);

    useEffect(() => {
        const loadPhotos = async () => {
            setLoading(true);
            try {
                const response = await fetchPhotos(page);
                if (response.data.length === 0) {
                    setEndOfList(true);  // No more photos to load
                } else {
                    setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
            setLoading(false);
        };

        loadPhotos();
    }, [page]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
            loading
        ) {
            return;
        }
        setPage((prevPage) => prevPage + 1);
    }, [loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div>
            <PhotoGrid photos={photos} loading={loading} />
            {loading && <Loading />}
            {endOfList && <p>No more photos to load.</p>}
        </div>
    );
}

export default HomePage;