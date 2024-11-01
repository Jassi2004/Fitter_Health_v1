import axios from 'axios';

interface LoginData {
    email: string;
    password: string;
}

const sendLogin = async (data: LoginData) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error during login:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error during login:", error);
        }
        throw error; // Re-throw for further handling in the component
    }
};

export default sendLogin;
