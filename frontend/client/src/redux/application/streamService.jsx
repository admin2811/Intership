import axios from "axios";

const API_URL = 'http://localhost:5000/api/streams';

export const createStream = async (streamData) => {
    try {
        // Thực hiện yêu cầu POST với axios
        const response = await axios.post(API_URL, streamData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Error: ${error.response.data.message || 'Something went wrong'}`);
        } else {
            throw new Error('Network error or server is unreachable');
        }
    }
};
