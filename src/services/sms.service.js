
import axios from 'axios';

let DEKU_API_URL = process.env.REACT_APP_DEKU_API_URL;

export function getList() {
    return fetch(DEKU_API_URL + "/messages")
        .then(data => data.json())
}

export const getMessages = () => {
    axios.get(DEKU_API_URL + "/messages")
        .then(res => res.data)
}