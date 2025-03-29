import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'
let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/people`)
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/people/${id}`)
    return response.data
}

const post = async (newData) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${baseUrl}/people`, newData, config)
    return response.data
}

const put = async (id, newData) => {
    const response = await axios.put(`${baseUrl}/people/${id}`, newData)
    return response.data
}

const del = async (id) => {
    const response = await axios.delete(`${baseUrl}/people/${id}`)
    return response.data
}

export default { setToken, getAll, getOne, post, put, del }