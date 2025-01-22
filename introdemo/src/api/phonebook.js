import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getAll = () => {
    const req = axios.get(`${baseUrl}/people`)
    return req.then(response => response.data)
}

const getOne = (id) => {
    const req = axios.get(`${baseUrl}/people/${id}`)
    return req.then(response => response.data)
}

const post = (newData) => {
    const req = axios.post(`${baseUrl}/people`, newData)
    return req.then(response => response.data)
}

const put = (id, newData) => {
    const req = axios.put(`${baseUrl}/people/${id}`, newData)
    return req.then(response => response.data)
}

const del = (id) => {
    const req = axios.delete(`${baseUrl}/people/${id}`)
    return req.then(response => response.data)
}

export default { getAll, getOne, post, put, del }