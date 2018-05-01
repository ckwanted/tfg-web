import axios from 'axios'
import Constant from './Constant'
import iziToast from 'izitoast'

class Api {

    constructor(token) {
        this.axios = axios.create({
            baseURL: Constant.API,
            timeout: 30000,
            headers: {'Authorization': 'Bearer ' + token}
        })

        /*
         * Error Handling
         */
        this.axios.interceptors.response.use((response) => response, (error) => {
            switch(error.response.status) {
                case 401:
                    //TODO: invalidate session
                    break
                case 404:
                    iziToast.error({
                        title: 'Error',
                        message: 'Este recurso no se encuentra disponible',
                        position: 'topRight'
                    })
                    break
                default:
                    break
            }
        })
    }

    login(email, password) {
        return this.axios.post('/auth/login', {
            email,
            password
        })
    }

}

export default Api
