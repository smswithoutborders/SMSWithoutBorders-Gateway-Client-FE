
let DEKU_API_URL = process.env.REACT_APP_DEKU_API_URL;

export function getMessages() {
    return fetch(DEKU_API_URL + "/messages")
        .then(data => data.json())
}
