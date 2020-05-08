import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.pro.coinbase.com",
});

instance.interceptors.request.use((request) => {
  return request;
});

export default instance;
