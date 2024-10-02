import { baseUrl, headers } from './baseUrl';
import axios from 'axios';


export const getImages = async (data) => {
    try {
        const response = await axios.get(`${baseUrl}/v1/images/search`, {
            params: {
                ...data,
            },
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching images', error);
        return (error.response && error.response.data) || { message: error.message };
    }
};


export const getBreeds = async () => {
    try {
        const response = await axios.get(`${baseUrl}/v1/breeds`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching breeds', error);
        return (error.response && error.response.data) || { message: error.message };
    }
};


export const getImageDetails = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/v1/images/${id}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching image details', error);
        return (error.response && error.response.data) || { message: error.message };
    }
};
