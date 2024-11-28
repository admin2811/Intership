import axios from "axios";

const API_URL = 'http://localhost:5000/api/streams';

export const createStream = async (streamData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        console.log(streamData);
        const response = await axios.post(`${API_URL}/create`, streamData, config);
        return response.data; // Trả về toàn bộ dữ liệu từ server
    } catch (error) {
        // Nếu có lỗi, kiểm tra và trả về lỗi từ server
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'An error occurred');
        } else {
            throw new Error('Unable to connect to the server');
        }
    }
};
  
export const getStreamsByUser = async (userId) => { 
    try {
        const response = await axios.get(`${API_URL}/user_streams/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'An error occurred');
        } else {
            throw new Error('Unable to connect to the server');
        }
    }
}

export const getStreamInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/streamInfo`);
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'An error occurred');
        } else {
            throw new Error('Unable to connect to the server');
        }
    }
}

const streamService = {
    createStream,
    getStreamsByUser,
    getStreamInfo
};
export default streamService;
