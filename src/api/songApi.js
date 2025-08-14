import apiClient  from "./apiClient";

export const getSongs = async (groupId, page=1, searchTerm=null, filters) => {
    let params = {}
    if (searchTerm) {
      params[`filter[q]`] = searchTerm;
    }
    if(filters.key_chord != ""){
        params[`filter[key_chord]`] = filters.key_chord;
    }
    if(filters.tags.length > 0) {
        params["filter[tag]"] = filters.tags[0]
    }
    params[`filter[group_id]`] = groupId;
    params["page[limit]"] = 5
    params["page[number]"] = page
    params[`sort[id]`] = "desc";
    try {
        const response = await apiClient.get('/songs', {params: params})
        return response
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error de red o del servidor'
        throw new Error(errorMessage)
    }
}

export const deleteSong = async (songId) => {
    const response = await apiClient.delete(`/songs/${songId}`)
}