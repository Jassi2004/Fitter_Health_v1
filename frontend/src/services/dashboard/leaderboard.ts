import axios from "axios";

const API_URL = "http://localhost:8080";

const getLeaderboard = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/leaderboard`);
        return response.data; // Handle success response
    } catch (error: any) {
        console.error("Error fetching leaderboard:", error.message);
        throw error.response?.data || error.message; // Handle error
    }
};

export default getLeaderboard;
