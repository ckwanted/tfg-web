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

export const fetchCourse = (slug) => {
    return (dispatch) => {

        dispatch(courseChangeValue("loading", true))

        new Api().fetchCourse(slug).then(response => {
            const {course} = response.data
            dispatch(fetchCourseSuccess(course))
        }).catch(error => {
            dispatch(fetchCourseSuccess({}))
        })

    }
}

export const fetchCourseSuccess = (payload) => {
    return {
        type: actionType.FETCH_COURSE,
        payload: payload
    }
}

export const searchCourse = (q) => {
    return (dispatch, getState) => {

        //const { courseReducer: {q} } = getState();

        dispatch(courseChangeValue("loading", true))

        new Api().searchCourse(q).then(response => {
            const {courses} = response.data
            dispatch(fetchAllCoursesSuccess(courses))
        }).catch(error => {
            dispatch(courseChangeValue("loading", false))
        })

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

