import axios from "axios";

const url = "http://localhost:8080/"

export const get = (endpoint) => {
    return axios.get(url+endpoint)
}

export const post = (endpoint, body) => {
    return axios.post(endpoint, body);
}

export const getUser = (userName) => {
    let user;
    axios.get(`${url}user/${userName}`)
        .then((res) => res)
        .then((data) => {
            user = data.data;
        })
        .catch((err) => console.log(err));
    return user;
}

export const login = (username, password) => {
    return axios.post(`${url}user/login`, {
            username,
            password
    },{
        headers: {"Access-Control-Allow-Origin": "*"}
        })
}

export const updateUser = (user) => {
    return axios.put(`${url}user/update`,{
        "id" : user.id,
        "firstName" : user.firstName,
        "lastName" : user.lastName,
        "username": user.username,
        "password": user.password,
        "address" : user.address,
        "email" : user.email,
        "phone" : user.phone,
    },{
        headers: {"Access-Control-Allow-Origin": "*"}
    })
}

export const register = (user) => {
    return axios.post(`${url}user/add-user`, {
        "firstName" : user.firstName,
        "lastName" : user.lastName,
        "username": user.username,
        "password": user.password,
        "address" : user.address,
        "email" : user.email,
        "phone" : user.phone,
    },{
        headers: {"Access-Control-Allow-Origin": "*"}
    })
}
