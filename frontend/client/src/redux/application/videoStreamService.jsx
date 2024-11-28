import axios from "axios";

const API_URL = 'http://localhost:5000/api/streams';

const startStream = async (startStreamData) => {
    const jsonPayload = {
      key: startStreamData.get('key'),
      videoUrl: startStreamData.get('videoUrl'),
      action: startStreamData.get('action'),
    };
  
    try {
      const response = await axios.post(`${API_URL}/watch_stream`, jsonPayload, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  };

const videoStreamService = { startStream }
export default videoStreamService;
