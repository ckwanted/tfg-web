import * as actionType from './types'
import {Api} from '../commons'
import iziToast from 'izitoast'

export const fetchAllCourses = () => {
    return (dispatch) => {

        dispatch(courseChangeValue("loading", true))

        new Api().allCourses().then(response => {
            const {courses} = response.data
            dispatch(fetchAllCoursesSuccess(courses))
        }).catch(error => {
            iziToast.error({
                title: '',
                message: 'No he ha podido buscar los cursos',
                position: 'topRight'
            })
            dispatch(courseChangeValue("loading", false))
        });
    }
}

export const fetchAllCoursesSuccess = (payload) => {
    return {
        type: actionType.FETCH_ALL_COURSES,
        payload: payload
    }
}


export const courseChangeValue = (key, value) => {
    return {
        type: actionType.COURSE_CHANGE_VALUE,
        payload: {
            key,
            value
        }
    }
}

