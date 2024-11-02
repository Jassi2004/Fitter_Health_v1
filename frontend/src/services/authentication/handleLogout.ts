import axios from "axios";

export const handleLogout = async (router: any): Promise<void> => {
  console.log("Attempting to log out...");
  try {
    const response = await axios.post("http://localhost:8080/auth/logout");
    console.log("Logout successful:", response.data);
    localStorage.clear();
    localStorage.removeItem("email");
    router.push("/authentication/login");
    console.log("Redirecting to login...");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
