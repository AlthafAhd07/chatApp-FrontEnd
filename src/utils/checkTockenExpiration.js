import jwt_decode from "jwt-decode";
import axios from "axios";

// to check we are usuing jwt-decode

export const CheckTokenEx = async (token) => {
  const decoded = jwt_decode(token);

  // jwt expire o illayo endu check panra
  // expire illatti return panra  ,, expire enda request ondu anuppura access token a edukka
  if (decoded.exp >= Date.now() / 1000) return;

  const res = await axios.get("/api/refresh_token");

  //   dispatch({ type: "AUTH", payload: res.data });

  return res.data.access_token;
};
