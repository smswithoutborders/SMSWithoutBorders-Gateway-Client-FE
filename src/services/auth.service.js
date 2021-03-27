
let AUTH_URL = process.env.REACT_APP_API_URL;

export const userLogin = async (credentials) => {
    return fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
};

export const setToken = (token) => {
    sessionStorage.setItem('c-deck-token', token);
};

export const removeToken = () => {
    sessionStorage.removeItem('c-deck-token');
}

//setIsLoggedIn is parsed from the app component
export const logOut = (setIsLoggedIn) => {
    //log the user out by changing state
    setIsLoggedIn(false);
    //remove user token from session storage
    removeToken();
};
