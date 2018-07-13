import * as actionType from '../actions/types'

const DEFAULT_QUIZ = {
    result: 0,
    question: "pregunta",
    answers: ["respuesta"]
}

const INITIAL_STATE = {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
    loading: false,
    loadingPhoto: false,
    userPayments: [],
    my_vote: null,

    myCourses: {},
    course: {},
    modalData: null,
    sectionSelectedTitle: '',
    sectionSelected: {
        title: '',
        id: null,
        resourcesLength: 0,
    },
    resourceSelected: {
        value: 0,
        type: null,
        title: '',
        id: null,
        section_id: null,
        uri: '',
        quiz: [
            DEFAULT_QUIZ
        ],
        progress: null,
        selectedFile: null,
    },

    q: '',
    ckFrontEnd: false,
    ckBackEnd: false,
    ckFullStack: false,
    ckDevOps: false,
    ckAndroid: false,
    ckIos: false,

    ckBeginner: false,
    ckIntermediate: false,
    ckAdvanced: false,

    dialogEditCourse: false,

    dialogNewSection: false,
    dialogEditSection: false,

    dialogNewResource: false,
    dialogEditResource: false,

    progress: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.FETCH_ALL_COURSES:
            const {current_page, last_page, total, data} = action.payload.courses
            return {
                ...state,
                current_page,
                last_page,
                total,
                data,
                loading: false,
                userPayments: action.payload.userPayments
            }
        case actionType.FETCH_COURSE:
            return {
                ...state,
                course: action.payload.course,
                my_vote: action.payload.my_vote,
                loading: false
            }
        case actionType.COURSE_CHANGE_VALUE:
            const {key, value, jsonKey} = action.payload

            if(jsonKey) {
                let json = state[jsonKey]
                return {
                    ...state,
                    [jsonKey]: {
                        ...json,
                        [key]: value
                    }
                }
            }

            return {
                ...state,
                [key]: value
            }

        case actionType.UPDATE_COURSE:
            let updateCourse = state.course
            updateCourse.name = action.payload.name
            updateCourse.description = action.payload.description
            updateCourse.category = action.payload.category
            updateCourse.skill_level = action.payload.skill_level
            updateCourse.price = action.payload.price

            let dataUpdate = state.data

            for(let i = 0; i < dataUpdate.length; i++) {
                if(dataUpdate[i].id === updateCourse.id) {
                    dataUpdate[i] = updateCourse
                    break
                }
            }

            return {
                ...state,
                course: updateCourse,
                data: dataUpdate
            }

        case actionType.ADD_NEW_SECTION:
            let course = state.course
            course.sections = course.sections.concat(action.payload)
            return {
                ...state,
                course: course
            }

        case actionType.EDIT_SECTION:
            let updateCourseSection = state.course
            let updateSection = updateCourseSection.sections

            for(let i = 0; i < updateSection.length; i++) {
                if(updateSection[i].id === action.payload.id) {
                    updateSection[i] = action.payload
                    break
                }
            }
            return {
                ...state,
                course: updateCourseSection
            }

        case actionType.REMOVE_SECTION:

            let removeCourseSection = state.course
            let removeSection = removeCourseSection.sections

            removeSection = removeSection.filter(section => section.id !== action.payload)
            removeCourseSection.sections = removeSection

            return {
                ...state,
                course: removeCourseSection
            }

        case actionType.CLEAR_COURSE_FILTER:

            return {
                ...state,
                ckFrontEnd: false,
                ckBackEnd: false,
                ckFullStack: false,
                ckDevOps: false,
                ckAndroid: false,
                ckIos: false,

                ckBeginner: false,
                ckIntermediate: false,
                ckAdvanced: false,
            }

        case actionType.MY_COURSE:

            return {
                ...state,
                myCourses: action.payload
            }

        case actionType.CHANGE_COURSE_PHOTO:

            let copyData = state.data
            let copyCourse = state.course

            for(let i = 0; i < copyData.length; i++) {

                if(copyData[i].id === action.payload.course.id) {
                    copyData[i].photo = action.payload.course.photo
                    break
                }
            }

            copyCourse.photo = action.payload.course.photo

            return {
                ...state,
                data: copyData,
                course: copyCourse,
                loadingPhoto: false,
            }

        case actionType.RESET_RESOURCE:

            return {
                ...state,
                dialogNewResource: false,
                dialogEditResource: false,
                resourceSelected: {
                    value: 0,
                    type: null,
                    title: '',
                    id: null,
                    section_id: null,
                    uri: '',
                    quiz: [
                        DEFAULT_QUIZ
                    ],
                    progress: null,
                    selectedFile: null,
                }
            }

        case actionType.EDIT_DIALOG_RESOURCE:

            const resource = action.payload.resource
            let resourceSelectedCopy = {...state.resourceSelected}

            resourceSelectedCopy.title = resource.title
            resourceSelectedCopy.id = resource.id
            resourceSelectedCopy.section_id = resource.section_id
            resourceSelectedCopy.quiz = resource.quiz //TODO: check
            resourceSelectedCopy.uri = resource.uri

            if(resource.uri) resourceSelectedCopy.type = "uri"
            else resourceSelectedCopy.type = "quiz"

            return {
                ...state,
                resourceSelected: resourceSelectedCopy,
                dialogEditResource: true
            }

        case actionType.ADD_QUIZ:

            let resourceSelectedAdd = {...state.resourceSelected}
            resourceSelectedAdd.quiz.push({...DEFAULT_QUIZ})

            return {
                ...state,
                resourceSelected: resourceSelectedAdd
            }

        case actionType.REMOVE_QUIZ:

            let resourceSelectedRemove = {...state.resourceSelected}
            let quizRemove = resourceSelectedRemove.quiz.filter((quiz, i) => {
                return i !== action.payload
            })

            resourceSelectedRemove.quiz = quizRemove
            resourceSelectedRemove.value = 0

            return {
                ...state,
                resourceSelected: resourceSelectedRemove
            }

        case actionType.EDIT_QUESTION_QUIZ:

            let resourceSelectedEditQuiz = {...state.resourceSelected}
            resourceSelectedEditQuiz.quiz[resourceSelectedEditQuiz.value].question = action.payload

            return {
                ...state,
                resourceSelected: resourceSelectedEditQuiz
            }

        case actionType.EDIT_RESULT_QUIZ:

            let resourceSelectedEditResult = {...state.resourceSelected}
            resourceSelectedEditResult.quiz[resourceSelectedEditResult.value].result = Number(action.payload)

            return {
                ...state,
                resourceSelected: resourceSelectedEditResult
            }

        case actionType.ADD_ANSWER_QUIZ:

            let resourceSelectedAddAnswer = {...state.resourceSelected}
            resourceSelectedAddAnswer.quiz[resourceSelectedAddAnswer.value].answers = resourceSelectedAddAnswer.quiz[resourceSelectedAddAnswer.value].answers.concat("")

            return {
                ...state,
                resourceSelected: resourceSelectedAddAnswer
            }

        case actionType.EDIT_ANSWER_QUIZ:

            let resourceSelectedEditAnswer = {...state.resourceSelected}
            resourceSelectedEditAnswer.quiz[resourceSelectedEditAnswer.value].answers[action.payload.i] = action.payload.text

            return {
                ...state,
                resourceSelected: resourceSelectedEditAnswer
            }

        case actionType.REMOVE_ANSWER_QUIZ:

            let resourceSelectedRemoveAnswer = {...state.resourceSelected}

            let quiz = resourceSelectedRemoveAnswer.quiz
            let quizSelected = quiz[resourceSelectedRemoveAnswer.value]
            let answers = quizSelected.answers

            answers = answers.filter((answer, i) => {
                return i !== action.payload.i
            })

            resourceSelectedRemoveAnswer.quiz[resourceSelectedRemoveAnswer.value].result = 0
            resourceSelectedRemoveAnswer.quiz[resourceSelectedRemoveAnswer.value].answers = answers

            return {
                ...state,
                resourceSelected: resourceSelectedRemoveAnswer
            }

        default:
            return state
    }
}
