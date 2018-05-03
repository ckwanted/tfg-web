import axios from 'axios'
import Constant from './Constant'
import $ from 'jquery'
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
                case 422:
                    $.each(error.response.data.errors, function(key, value) {
                        iziToast.error({
                            title: '',
                            message: value,
                            position: 'topRight'
                        })
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

    register(name, last_name, email, password) {
        return this.axios.post('/auth/register', {
            name,
            last_name,
            email,
            password
        })
    }

    allCourses() {
        return this.axios.get('/courses')
    }

}

export default Api
