import axios from "axios";

interface ResetPasswordParams {
  token: string | string[] | undefined; 
  password: string;
}

const sendResetPassword = async ({ token, password }: ResetPasswordParams) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const tokenString = Array.isArray(token) ? token.join(",") : token;

  const response = await axios.post(`http://localhost:8080/auth/resetPassword?token=${encodeURIComponent(tokenString)}`, { password });

  return response.data; 
};

export default sendResetPassword;
