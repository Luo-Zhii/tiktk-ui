import * as requests from "../utils/httpRequests";

export const suggested = async (page, perPage) => {
  try {
    const res = await requests.get("users/suggested", {
      params: { page, per_page: perPage },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
