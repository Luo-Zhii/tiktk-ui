import * as requests from "../utils/httpRequests";

export const suggested = async (numPage, perPage) => {
  try {
    const res = await requests.get("/users/suggested", {
      params: {
        page: numPage,
        per_page: perPage,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
