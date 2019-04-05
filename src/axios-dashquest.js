import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://172.22.42.111:4400/dashquest',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    credentials: 'same-origin'
});

export default instance;