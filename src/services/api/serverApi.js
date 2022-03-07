import axios from "axios";
import nookies from "nookies";

const api = (context) => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Authorization": `Bearer ${nookies.get(context).tokenMinhasDespesas}`
    }
  });
}

export default api;