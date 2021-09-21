import axios from "axios";

const url = "http://localhost:8080/"

export const get = (endpoint) => {
    return axios.get(url+endpoint)
}

export const post = (endpoint, body) => {
    return axios.post(endpoint, body);
}

export const login = (username, password) => {
    return axios.post(`${url}user/login`, {
            username,
            password
    },{
        headers: {"Access-Control-Allow-Origin": "*"}
        }).then(result => {
        console.log(result.data)
    })
}
