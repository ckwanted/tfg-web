import * as actionType from './types'
import {Api} from '../commons'
import iziToast from 'izitoast'

export const fetchAllCourses = () => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        dispatch(courseChangeValue("loading", true))

        new Api(access_token).allCourses().then(response => {
            const {courses, userPayments} = response.data
            dispatch(fetchAllCoursesSuccess(courses, userPayments))
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

export const fetchAllCoursesSuccess = (courses, userPayments) => {
    return {
        type: actionType.FETCH_ALL_COURSES,
        payload: {
            courses,
            userPayments
        }
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

export const searchCourse = () => {
    return (dispatch, getState) => {

        const { courseReducer: {q} } = getState();

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

export const updateCourse = (id, name, description, category, skill_level, price) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        new Api(access_token).updateCourse(id, name, description, category, skill_level, price).then(response => {
            dispatch(updateCourseSuccess(response.data.course))
        }).catch(error => {

        })


    }
}

export const updateCourseSuccess = (course) => {
    return {
        type: actionType.UPDATE_COURSE,
        payload: course
    }
}

export const addNewSection = (name) => {
    return (dispatch) => {

        //TODO: check
        /*new Api().fetchCourse(slug).then(response => {

        }).catch(error => {

        })*/
        dispatch(addNewSectionSuccess({id: 111, title: name, course_id: 9, resources: []}))

    }
}

export const addNewSectionSuccess = (section) => {
    return {
        type: actionType.ADD_NEW_SECTION,
        payload: section
    }
}

