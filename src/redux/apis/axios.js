import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL, //YOUR_API_URL HERE
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authAxios;