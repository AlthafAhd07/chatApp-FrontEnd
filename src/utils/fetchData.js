import axios from "axios";

// https://chatapp-backend-althaf.herokuapp.com
export const postAPI = async (url, post, token) => {
  const res = await axios.post(`api/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
  return res;
};
