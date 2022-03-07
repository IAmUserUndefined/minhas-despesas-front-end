import axios from "axios";
import nookies from "nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Authorization": `Bearer ${nookies.get().tokenMinhasDespesas}`
  }
});

export default api;