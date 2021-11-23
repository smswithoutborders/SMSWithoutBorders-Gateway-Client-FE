import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_GATEWAY_API_URL;

export const getModems = () => {
    return axios.get("/modems")
}