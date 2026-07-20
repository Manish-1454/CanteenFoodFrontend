import axios from 'axios';
const api = axios.create({ baseURL: 'https://canteenfoodbackend.onrender.com/api'|| 'https://canteenfoodbackend.onrender.com/api' });



export default api;