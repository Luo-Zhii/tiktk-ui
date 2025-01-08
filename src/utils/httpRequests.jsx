import axios from "axios";

const requests = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const get = async (path, options = {}) => {
  const response = await requests.get(path, options);
  return response.data;
};

export default requests;
