import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerapps-react.firebaseio.com/'
});

export default instance;