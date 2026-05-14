import axios from "axios";

console.log(process.env.REACT_APP_API_URL);


const api = axios.create({
  // baseURL: "http://localhost:5002/",
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;