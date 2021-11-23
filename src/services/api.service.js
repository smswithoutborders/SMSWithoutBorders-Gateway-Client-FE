import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_GATEWAY_API_URL;

export function getModems() {
    return axios.get("/modems")
}

export function getMessages(index) {
    return axios.get(`/modems/${index}/sms`)
}

export function sendMessage(index, phoneNumber, message) {
    return axios.post(`/modems/${index}/sms`,
        {
            number: phoneNumber,
            text: message
        })
}