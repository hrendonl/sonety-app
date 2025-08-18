import apiClient  from "./apiClient";

export const getUserGroups = async (userId) => {
    let params = {}
    params[`filter[member_id]`] = userId;
    params["page[limit]"] = 5
    // params[`sort[id]`] = "desc";
    try {
        const response = await apiClient.get('/groups', {params: params})
        return response
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error de red o del servidor'
        throw new Error(errorMessage)
    }
}
