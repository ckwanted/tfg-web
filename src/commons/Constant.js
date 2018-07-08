const Breakpoints = {
    xxs     : 390,
    xs      : 576,
    sm      : 768,
    md      : 992,
    lg      : 1200,
    full    : 1400,
}

const SLIDER = {
    IMAGE: 'IMAGE',
    COURSE: 'COURSE',
}

const Constant = {

    Breakpoints,
    SLIDER,

    CREATE: 'create',
    EDIT: 'edit',

    LOGIN: 'login',
    REGISTER: 'register',
    VIDEO: 'video',
    QUIZ: 'quiz',

    SIMPLE: 'simple',
    MULTIPLE: 'multiple',

    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',

    CATEGORIES: [
        {name: 'Front End', value: 'front-end'},
        {name: 'Back End', value: 'back-end'},
        {name: 'Full Stack', value: 'full-stack'},
        {name: 'Dev Ops', value: 'dev-ops'},
        {name: 'Android', value: 'android'},
        {name: 'Ios', value: 'ios'},
        {name: 'Otros', value: 'other'},
    ],

    SKILL_LEVEL: [
        {name: 'Principiante', value: 'beginner'},
        {name: 'Intermedio', value: 'intermediate'},
        {name: 'Avanzado', value: 'advanced'},
    ],

    ROLES: [
        {name: 'Administrador', value: 'admin'},
        {name: 'Profesor', value: 'teacher'},
        {name: 'Alumno', value: 'student'},
    ],

    RESOURCE: [
        {name: 'Video', value: 'uri'},
        {name: 'Questionario', value: 'quiz'},
    ],

    MULTIPART_FORM_DATA: "multipart/form-data"

}

export default Constant
