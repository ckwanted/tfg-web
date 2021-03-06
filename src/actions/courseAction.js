import * as actionType from './types'
import {Api, Constant} from '../commons'
import iziToast from 'izitoast'
import ImageCompressor from 'image-compressor.js'
import { history } from '../store'

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

export const courseChangeValue = (key, value, jsonKey = null) => {
    return {
        type: actionType.COURSE_CHANGE_VALUE,
        payload: {
            key,
            value,
            jsonKey
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

export const addNewSection = (course_id, title) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        new Api(access_token).createSection(course_id, title).then(response => {
            const {course_section} = response.data
            dispatch(addNewSectionSuccess(course_section))
        }).catch(error => {

        })

    }
}

export const addNewSectionSuccess = (section) => {
    return {
        type: actionType.ADD_NEW_SECTION,
        payload: section
    }
}

export const editSection = (section_id, title) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        new Api(access_token).editSection(section_id, title).then(response => {
            const {course_section} = response.data
            dispatch(editSectionSuccess(course_section))
        }).catch(error => {

        })

    }
}

export const editSectionSuccess = (section) => {
    return {
        type: actionType.EDIT_SECTION,
        payload: section
    }
}

export const removeSection = (section_id) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();

        new Api(access_token).removeSection(section_id).then(response => {
            dispatch(removeSectionSuccess(section_id))
            dispatch(courseChangeValue("dialogEditSection", false))
            document.body.removeAttribute("style")
        }).catch(error => {
            dispatch(courseChangeValue("dialogEditSection", false))
            document.body.removeAttribute("style")
        })

    }
}

export const removeSectionSuccess = (section_id) => {
    return {
        type: actionType.REMOVE_SECTION,
        payload: section_id
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

export const changeCoursePhoto = (course_id, file) => {
    return (dispatch, getState) => {

        const {authReducer: {access_token}} = getState()

        new ImageCompressor(file, {
            quality: .6,
            success(result) {

                const formData = new FormData()

                formData.append('photo', result)

                new Api(access_token, Constant.MULTIPART_FORM_DATA).changePhoto(course_id, formData).then(response => {
                    const {course} = response.data
                    dispatch(changeCoursePhotoSuccess(course))
                }).catch(error => {
                    dispatch(courseChangeValue("loadingPhoto", false))
                })

            },
            error(e) {
                dispatch(courseChangeValue("loadingPhoto", false))
            },
        })

    }
}

export const myCourse = () => {
    return (dispatch, getState) => {

        const {authReducer: {access_token}} = getState()
        dispatch(courseChangeValue("loading", true))

        new Api(access_token).myCourse().then(({data}) => {
            dispatch(myCourseSuccess(data))
            dispatch(courseChangeValue("loading", false))
        }).catch(error => {
            dispatch(myCourseSuccess({}))
            dispatch(courseChangeValue("loading", false))
        })

    }
}

export const myCourseSuccess = (data) => {
    return {
        type: actionType.MY_COURSE,
        payload: data
    }
}

export const changeCoursePhotoSuccess = (course) => {
    return {
        type: actionType.CHANGE_COURSE_PHOTO,
        payload: {
            course
        }
    }
}

export const addNewResource = (file = null) => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
            courseReducer: {resourceSelected},
        } = getState()

        let formData = new FormData()

        formData.append('section_id', resourceSelected.section_id)
        formData.append('title', resourceSelected.title)

        if(file) formData.append('uri', file)
        else formData.append('quiz', JSON.stringify(resourceSelected.quiz))

        new Api(access_token, Constant.MULTIPART_FORM_DATA).newResource(resourceSelected.type, formData).then(({data}) => {
            //const {course_resource} = data
            window.location.reload()
            dispatch(resetResource())
        }).catch(error => {
            dispatch(resetResource())
        })

    }
}

export const editResource = (file = null) => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
            courseReducer: {resourceSelected},
        } = getState()

        let formData = new FormData()

        formData.append('section_id', resourceSelected.section_id)
        formData.append('title', resourceSelected.title)
        formData.append('_method', 'PUT')

        if(file) formData.append('uri', file)
        else formData.append('quiz', JSON.stringify(resourceSelected.quiz))

        new Api(access_token, Constant.MULTIPART_FORM_DATA).editResource(resourceSelected.type, formData, resourceSelected.id).then(({data}) => {
            //const {course_resource} = data
            window.location.reload()
            dispatch(resetResource())
        }).catch(error => {
            dispatch(resetResource())
        })

    }
}

export const removeResource = () => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
            courseReducer: {resourceSelected},
        } = getState()

        new Api(access_token).removeResource(resourceSelected.id).then((response) => {
            window.location.reload()
            dispatch(resetResource())
        }).catch(error => {
            dispatch(resetResource())
        })

    }
}


export const resetResource = () => {
    return {
        type: actionType.RESET_RESOURCE,
    }
}

export const editDialogResource = (resource) => {
    return {
        type: actionType.EDIT_DIALOG_RESOURCE,
        payload: {
            resource
        }
    }
}

export const addQuiz = () => {
    return {
        type: actionType.ADD_QUIZ
    }
}

export const removeQuiz = (i) => {
    return {
        type: actionType.REMOVE_QUIZ,
        payload: i
    }
}

export const editQuestionQuiz = (payload) => {
    return {
        type: actionType.EDIT_QUESTION_QUIZ,
        payload
    }
}

export const editResultQuiz = (payload) => {
    return {
        type: actionType.EDIT_RESULT_QUIZ,
        payload
    }
}

export const addAnswerQuiz = () => {
    return {
        type: actionType.ADD_ANSWER_QUIZ,
    }
}

export const editAnswerQuiz = (i, text) => {
    return {
        type: actionType.EDIT_ANSWER_QUIZ,
        payload: {
            i,
            text
        }
    }
}

export const removeAnswerQuiz = (i) => {
    return {
        type: actionType.REMOVE_ANSWER_QUIZ,
        payload: {
            i
        }
    }
}

export const createCourse = (name, description, price, category, skill_level, selectedFile) => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
        } = getState()

        let formData = new FormData()

        formData.append('name', name)
        formData.append('slug', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('skill_level', skill_level)
        formData.append('selectedFile', selectedFile)

        new Api(access_token, Constant.MULTIPART_FORM_DATA).createCourse(formData).then((response) => {
            history.replace(`/my/course`)
            dispatch(courseChangeValue("progress", null))
        }).catch(error => {
            iziToast.error({
                title: '',
                message: 'El nombre ya esta en uso',
                position: 'topRight'
            })
            dispatch(courseChangeValue("progress", null))
        })

    }
}


/*
 * GETERS
 */

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
