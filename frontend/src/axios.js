import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT || 'https://covid19help-india.herokuapp.com/';
console.log("ENv = ",process.env.REACT_APP_DEVELOPMENT_API_ENDPOINT)
console.log("All env = ",process.env)

const instance = axios.create({
    baseURL:API_ENDPOINT
});



export default instance;