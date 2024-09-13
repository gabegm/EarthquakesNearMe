import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getEarthquakes = async (lat: number, lon: number): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/earthquakes/closest`, {
            params: {lat, lon}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching earthquakes:', error);
        throw error;
    }
};
