
import axios from "axios";

const API = axios.create({
  baseURL: "https://wecooking-back.onrender.com/api/",
});

export default API;
