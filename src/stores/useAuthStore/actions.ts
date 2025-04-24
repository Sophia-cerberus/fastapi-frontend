import axios from "axios"
import { auth } from '@/client/sdk'

const loginJWT = async (email: string, password: string) => {
    try {
        const response = await auth.login(email, password)
        if (response.data?.userData) {
            const { userData, access, refresh } = response.data

            localStorage.setItem("accessToken", access)
            localStorage.setItem("refreshToken", refresh)
            localStorage.setItem("userInfo", JSON.stringify(userData))
            setBearer(access)
        }
        return response
    } catch (error: any) {
        throw new Error(error.response?.data?.message?.[0] || "Login failed")
    }
}

const fetchAccessToken = async () => {
    const response = await auth.refreshToken()
    const access = response.data.access

    localStorage.setItem("accessToken", access)
    setBearer(access)
    return access
}

const setBearer = (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

const logout = () => {
    localStorage.clear()
    delete axios.defaults.headers.common["Authorization"]
}

export default {
    loginJWT, fetchAccessToken, logout
}