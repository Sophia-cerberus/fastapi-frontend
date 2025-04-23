import axios from "axios";

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"


export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(access: string, refresh: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken()
    if (!refreshToken) throw new Error("No refresh token available")

    const response = await axios.post("/auth/refresh", {
        refreshToken: refreshToken
    })

    const { access_token, refresh_token } = response.data
    setTokens(access_token, refresh_token)
    return access_token
}