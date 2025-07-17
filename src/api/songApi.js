import apiClient  from "./apiClient";

export const getSongs = async (groupId, page=1, searchTerm=null) => {
    let params = {}
    if (searchTerm) {
      params[`filter[title]`] = searchTerm;
    }
    params[`filter[group_id]`] = groupId;
    params["page[limit]"] = 5
    params["page[number]"] = page
    params[`sort[title]`] = "asc";
    try {
        const response = await apiClient.get('/songs', {params: params})
        return response
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error de red o del servidor'
        throw new Error(errorMessage)
    }
}