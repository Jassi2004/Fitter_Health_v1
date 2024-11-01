// services/authentication/sendOTP.ts
import axios from 'axios';

const sendOTP = async (otp: number) => {
    const email = localStorage.getItem('email');
    console.log(email);
    const verificationCode = otp;
    try {
        const response = await axios.post('http://localhost:8080/auth/verifyOtp', {
            email,
            verificationCode,
        });

        console.log('OTP verified successfully:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error during OTP verification:', error);
        throw error; 
    }
};

export default sendOTP;
