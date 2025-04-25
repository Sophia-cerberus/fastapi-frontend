import axios from "axios"
import { AuthService } from '@/client/sdk'
import { auth } from "@/client/types"


const loginJWT = async (formData: auth.LoginAccessTokenData) => {
  try {
    const response = await AuthService.login(formData)
    if (response.userData) {
      const { userData, access_token, refresh_token } = response

      localStorage.setItem("accessToken", access_token)
      localStorage.setItem("refreshToken", refresh_token)
      localStorage.setItem("userInfo", JSON.stringify(userData))
      setBearer(access_token)
    }
    return response
  } catch (error: any) {
    throw new Error(error.response?.data?.message?.[0] || "Login failed")
  }
}

const fetchAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken")

  if (!refreshToken) {
    throw new Error("No refresh token found")
  }

  const refreshData: auth.LoginRefreshTokenData = {
    formData: {
      refresh: refreshToken
    }
  }

  const response = await AuthService.refresh(refreshData)
  const access = response.access_token

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