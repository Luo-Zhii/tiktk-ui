
import axios from "axios";

const authRequests = axios.create({
  baseURL: import.meta.env.MONGO_BE_URL, 
  withCredentials: true, 
});


export const get = async (path, options = {}) => {
  const response = await authRequests.get(path, options);
  return response.data;
};


export const post = async (path, data = {}, options = {}) => {
  const response = await authRequests.post(path, data, options);
  return response.data;
};


export const put = async (path, data = {}, options = {}) => {
  const response = await authRequests.put(path, data, options);
  return response.data;
};


export const del = async (path, options = {}) => {
  const response = await authRequests.post(path, options);
  return response.data;
};

export default authRequests;
