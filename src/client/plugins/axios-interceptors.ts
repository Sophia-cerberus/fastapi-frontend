import type { AxiosInstance } from "axios"
import router from "@/routes"
import { useAuthStore } from "@/stores"
import { OpenAPI } from "@/client/core/OpenAPI"

let isAlreadyFetchingAccessToken = false
let subscribers: ((token: string) => void)[] = []

function onAccessTokenFetched(token: string) {
  subscribers.forEach(callback => callback(token))
  subscribers = []
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback)
}

export const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(

    async request => {
      return await OpenAPI.interceptors.request.run(request)
    }
  )

  axiosInstance.interceptors.response.use(

    async response => {
      return await OpenAPI.interceptors.response.run(response)
    },

    async error => {
      const { config, response } = error
      const originalRequest = config
      const authStore = useAuthStore()

      if (response?.status === 401) {
        authStore.logout()
        router.replace({
          path: "/sign-in",
          query: { redirect: router.currentRoute.value.fullPath },
        })
      }

      else if (response?.status === 403) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          try {
            const accessToken = await authStore.fetchAccessToken()
            onAccessTokenFetched(accessToken)
          } finally {
            isAlreadyFetchingAccessToken = false
          }
        }

        return new Promise(resolve => {
          addSubscriber((token: string) => {
            originalRequest.headers.Authentication = `Bearer ${token}`
            resolve(axiosInstance(originalRequest))
          })
        })
      }

      else if (response?.status === 500) {
        router.replace({
          path: "/maintenance",
          query: { redirect: router.currentRoute.value.fullPath },
        })
      }
      return Promise.reject(error)
    }
  )
}