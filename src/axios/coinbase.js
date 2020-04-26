import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-public.sandbox.pro.coinbase.com'
});

instance.interceptors.request.use(request => {
    console.log(request);
    return request;
});

export default instance;