import axios from "axios";

const API_URL = "http://localhost:8080";

// Fetch user's calorie data
const getUserCalories = async (userId: any) => {
    try {
        const response = await axios.get(`${API_URL}/api/calories/${userId}/getCaloriesBurnt`);
        return response.data; // Handle success response
    } catch (error) {
        console.error("Error fetching user calories:", error.message);
        throw error.response?.data || error.message; // Handle error
    }
};

export default getUserCalories;
