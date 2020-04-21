import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.alphavantage.co'
});

instance.interceptors.request.use(request => {
    request.url += "&apikey=1PL9DLSVAGDXL40I";
    return request;
});

export default instance;