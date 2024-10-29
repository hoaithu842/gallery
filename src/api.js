// src/api.js
import axios from 'axios';

const API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'Knxq3Nq5z8lblrFlN6nbiURZJytHOGRogpUxRzkSelA';

export const fetchPhotos = (page = 1, perPage = 10) => {
    return axios.get(`${API_URL}/photos`, {
        params: { page, per_page: perPage },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });
};

export const fetchPhotoDetails = (id) => {
    return axios.get(`${API_URL}/photos/${id}`, {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });
};