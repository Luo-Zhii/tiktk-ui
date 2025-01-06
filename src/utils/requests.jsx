import axios from "axios";

const requests = axios.create({
  baseURL: "https://tiktok.fullstack.edu.vn/api/",
});

export const get = async (path, options = {}) => {
  const response = await requests.get(path, options);
  return response.data;
};

export default requests;
