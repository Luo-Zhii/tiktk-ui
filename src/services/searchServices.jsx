import * as requests from "../utils/httpRequests";

export const search = async (q, type = "less") => {
  try {
    const res = await requests.get("users/search", {
      params: { q, type },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
