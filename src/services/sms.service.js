import axios from 'axios';

let DEKU_API_URL = process.env.REACT_APP_DEKU_API_URL;

export const getMessages = () => {
    return fetch(DEKU_API_URL + "/messages")
        .then(response => response.json())
}

export const sendMessage = (receiver, message) => {

    return axios.post(DEKU_API_URL + "/messages",
        {
            phonenumber: receiver,
            text: message
        })
        .then(response => response.data)
}

export const getLogs = () => {
    return axios.get(DEKU_API_URL + "/logs")
    .then(response => response.data)
}