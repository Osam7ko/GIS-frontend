
import axios from "axios";

const server = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER || "http://localhost:3000/api/search",
});

export default server;
