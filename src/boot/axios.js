import axios from 'axios'

const axiosCont = axios.create({
  // baseURL: 'http://localhost:8000/'
  baseURL: 'http://192.168.0.26:8000'
  // headers: {"Access-Control-Allow-Origin": "*"}
})

export { axiosCont }
