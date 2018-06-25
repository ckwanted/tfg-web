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

export const fetchAllCoursesSuccess = (courses, userPayments = []) => {
    return {
        type: actionType.FETCH_ALL_COURSES,
        payload: {
            courses,
            userPayments
        }
    }
}

export const fetchCourse = (slug) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        dispatch(courseChangeValue("loading", true))

        new Api(access_token).fetchCourse(slug).then(response => {
            const {course, my_vote} = response.data
            dispatch(fetchCourseSuccess(course, my_vote))
        }).catch(error => {
            dispatch(fetchCourseSuccess({}))
        })

    }
}

export const fetchCourseSuccess = (course, my_vote) => {
    return {
        type: actionType.FETCH_COURSE,
        payload: {
            course,
            my_vote
        }
    }
}

export const searchCourse = (clear = false) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();
        const { courseReducer: { q }} = getState();

        dispatch(courseChangeValue("loading", true))
        if(clear) dispatch(clearCourseFilter())

        let categories = getCategory(getState)
        let skill_level = getSkillLevel(getState)

        new Api(access_token).searchCourse(q, categories, skill_level).then(response => {
            const {courses, userPayments} = response.data
            dispatch(fetchAllCoursesSuccess(courses, userPayments))
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
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        //TODO: check
        /*new Api(access_token).fetchCourse(slug).then(response => {

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

export const clearCourseFilter = () => {
    return {
        type: actionType.CLEAR_COURSE_FILTER,
    }
}

export const voteCourse = (course_id, vote, slug) => {
    return (dispatch, getState) => {

        const {authReducer: {access_token}} = getState()

        new Api(access_token).vote(course_id, vote).then(response => {
            dispatch(fetchCourse(slug))
        }).catch(error => {

        })

    }
}

const getCategory = (getState) => {
    const { courseReducer: { ckFrontEnd, ckBackEnd, ckFullStack, ckDevOps, ckAndroid, ckIos }} = getState();

    let categories = '';

    if(ckFrontEnd) categories += 'front-end,'
    if(ckBackEnd) categories += 'back-end,'
    if(ckFullStack) categories += 'full-stack,'
    if(ckDevOps) categories += 'dev-ops,'
    if(ckAndroid) categories += 'android,'
    if(ckIos) categories += 'ios,'

    if(categories[categories.length - 1] === ',') {
        categories = categories.slice(0, -1)
    }

    return categories
}

const getSkillLevel = (getState) => {
    const { courseReducer: { ckBeginner, ckIntermediate, ckAdvanced }} = getState();

    let skill = '';

    if(ckBeginner) skill += 'beginner,'
    if(ckIntermediate) skill += 'intermediate,'
    if(ckAdvanced) skill += 'advanced,'

    if(skill[skill.length - 1] === ',') {
        skill = skill.slice(0, -1)
    }

    return skill
}
