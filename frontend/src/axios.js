import axios from 'axios';

const API_ENDPOINT = process.env.DEVELOPMENT_API_ENDPOINT || 'https://covid19help-india.herokuapp.com/';

const instance = axios.create({
    baseURL:API_ENDPOINT
});



export default instance;