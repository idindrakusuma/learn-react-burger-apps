import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerapps-react.firebaseio.com/',
});

instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;