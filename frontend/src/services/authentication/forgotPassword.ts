// services/authentication/sendForgotPasswordRequest.ts
import axios from "axios";

const sendForgotPasswordRequest = async (email: string) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/forgotPassword", { email });
    return response.data; // Handle success response
  } catch (error) {
    throw error; // Handle error
  }
};

export default sendForgotPasswordRequest;
