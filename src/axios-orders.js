import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8bb3d.firebaseio.com/'
});

export default instance;