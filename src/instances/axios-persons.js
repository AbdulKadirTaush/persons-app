import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://qw1lhv.herokuapp.com/'
})

export default instance