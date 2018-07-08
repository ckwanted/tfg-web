import axios from 'axios'
import $ from 'jquery'
import iziToast from 'izitoast'
import {Constant} from './index'

import * as actionCreators from '../actions'
import {store} from '../store'

const API = process.env.REACT_APP_API

class Api {

    constructor(token, type = '') {

        let options = {
            baseURL: API,
            timeout: 30000,
            headers: {'Authorization': 'Bearer ' + token}
        }

        if(type === Constant.MULTIPART_FORM_DATA) {
            options.config = { headers: {'Content-Type': Constant.MULTIPART_FORM_DATA }}
        }

        this.axios = axios.create(options)

        /*
         * Error Handling
         */
        this.axios.interceptors.response.use((response) => response, (error) => {
            switch(error.response.status) {
                case 401:
                    store.dispatch(actionCreators.logOut())
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

    fetchCourse(slug) {
        return this.axios.get(`/courses/${slug}`)
    }

    updateCourse(id, name, description, category, skill_level, price) {
        return this.axios.put(`/courses/${id}`, {
            name,
            description,
            category,
            skill_level,
            price
        })
    }

    searchCourse(q, categories = '', skill_level = '') {
        let qCategories = categories.length ? `&categories=${categories}` : ''
        let qSkill = skill_level.length ? `&skill_level=${skill_level}` : ''
        return this.axios.get(`/courses?q=${q}${qCategories}${qSkill}`)
    }

    payCart(courseIds) {
        return this.axios.post(`/cart`, {
            courses: courseIds
        })
    }

    vote(course_id, vote) {
        return this.axios.put(`/courses/${course_id}/vote`, {
            vote
        })
    }

    changePhoto(course_id, formData) {
        return this.axios.post(`/courses/photo/${course_id}`, formData)
    }

    createSection(course_id, title) {
        return this.axios.post(`/courses/section`, {
            course_id,
            title
        })
    }

    editSection(section_id, title) {
        return this.axios.put(`/courses/section/${section_id}`, {
            title
        })
    }

    removeSection(section_id) {
        return this.axios.delete(`/courses/section/${section_id}`)
    }

    sendPasswordEmail(email) {
        return this.axios.post(`/password/email`, {
            email
        })
    }

    passwordReset(token, email, password, password_confirmation) {
        return this.axios.post(`/password/reset`, {
            token,
            email,
            password,
            password_confirmation
        })
    }

    getTeachers() {
        return this.axios.get('/teachers')
    }

    myCourse() {
        return this.axios.get('/courses/myCourse')
    }

    fetchUsers(q = '', current_page = 1) {
        return this.axios.get(`/users?q=${q}&page=${current_page}`)
    }

    updateUser(user) {
        return this.axios.put(`/users/${user.id}`, {
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            rol: user.rol
        })
    }

    newResource(type = null, formData) {
        const defaultResource = Constant.RESOURCE[0] ? Constant.RESOURCE[0].value : ''

        if(type === defaultResource || type === null || type === undefined) {
            return this.axios.post(`/courses/section/resource`, formData, {
                onUploadProgress: progressEvent => {
                    console.log(`Upload Progress: ${Math.round(progressEvent.loaded / progressEvent.total * 100) + '%'}`)
                }
            })
        }

        return this.axios.post(`/courses/section/resource`, formData)
    }

}

export default Api
