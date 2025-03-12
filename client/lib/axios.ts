import axios from "axios"

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        }
        return config
    },
    (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem("refreshToken")
                if (!refreshToken) {
                    window.location.href = "/auth/login"
                    return Promise.reject(error)
                }

                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken,
                })

                const { accessToken, refreshToken: newRefreshToken } = response.data
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", newRefreshToken)

                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                window.location.href = "/auth/login"
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    },
)

export default axiosInstance

