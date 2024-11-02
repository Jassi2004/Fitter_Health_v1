import axios from "axios";

interface ResetPasswordParams {
  token: string | string[] | undefined; // Handle string or array in case of multiple tokens
  password: string;
}

const sendResetPassword = async ({ token, password }: ResetPasswordParams) => {
  const response = await axios.post(`http://localhost:3000/authentication/resetPassword/${token}`, { password });
  return response.data; 
};

export default sendResetPassword;
