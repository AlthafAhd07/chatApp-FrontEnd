import { getAPI, postAPI } from "./fetchData";
export const registerUser = (userData) => {
  try {
    postAPI("/register", userData);
    localStorage.setItem("logged", "true");
    window.location.href = "/";
  } catch (error) {
    return console.log(error);
  }
};
export const loginUser = (userData) => {
  try {
    postAPI("/login", userData);
    localStorage.setItem("logged", "true");
    window.location.href = "/";
  } catch (error) {
    return console.log(error);
  }
};

export const getRefreshToken = async () => {
  const logged = localStorage.getItem("logged");
  if (logged !== "true") return;
  try {
    const res = await getAPI(`refresh_token`);
    console.log(res);
    // dispatch({ type: "AUTH", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
