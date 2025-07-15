import apiClient from "./apiClient"

export const loginApi = async (credentials) => {
    try {
        const response = await apiClient.post('/login', credentials)
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error de red o del servidor'
        throw new Error(errorMessage)
    }

}