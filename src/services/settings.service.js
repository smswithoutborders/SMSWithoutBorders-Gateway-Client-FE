import axios from 'axios';

let DEKU_API_URL = process.env.REACT_APP_DEKU_API_URL;


export const getServiceState = () => {
    return axios.get(DEKU_API_URL + "/state")
    .then(response => response.data)
}