import * as authRequests from "../utils/authRequests";

export const login = async (username, password) => {
    try {
      const res = await authRequests.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      return res; 
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      throw error;
    }
  };
export const signup = async (name, email, password, age) => {
  try {
    const res = await authRequests.post("/auth/register", {
      params: {
        name,
        email,
        password,
        age,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
