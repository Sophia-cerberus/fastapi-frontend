import axios from "axios";


const login = (email: string, password: string) => {
    return axios.post("/sign-in", {
        username: email,
        password: password
    })
}


const refreshToken = () => {
    return axios.post("/refresh-token", {
        refresh: localStorage.getItem("refreshToken")
    })
}

export {
    login, refreshToken
}