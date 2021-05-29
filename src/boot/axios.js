import axios from 'axios'

const axiosCont = axios.create({
  baseURL: 'http://localhost:8000/'
})

export { axiosCont }
