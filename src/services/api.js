import axios from "axios";
import "dotenv/config";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("tokenMinhasDespesas")}`
  }
});

export default api;