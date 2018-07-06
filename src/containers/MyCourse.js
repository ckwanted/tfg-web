import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import Spinner from 'react-spinkit'
import {Constant} from '../commons'
import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import {CardCourse} from '../components'

class MyCourse extends Component {

    componentWillMount() {
        this.props.dispatch(actionCreators.myCourse())
    }

    _renderContent = () => {
        const {loading} = this.props.courses

        if(loading) return(
            <div className="row justify-content-center">
                <Spinner className="mt-5" name="folding-cube" color="#42648e"/>
            </div>
        )

        return this._renderTeacherContent()

    }

    _renderTeacherContent = () => {
        const AUTH = this.props.auth
        const {myCourses} = this.props.courses

        const MY_COURSES = myCourses.courses

        let teacherWrapper
        let teacherItem

        if(MY_COURSES && AUTH.rol === Constant.TEACHER) {
            if(MY_COURSES.length === 0) teacherItem = <p className="col-md-12">No tienes cursos</p>
            else {
                teacherItem = MY_COURSES.map(course => {
                    return(
                        <div key={course.id} className="col-md-3">
                            <CardCourse item={course} showCart={false} isStar={false} />
                        </div>
                    )
                })
            }

            teacherWrapper = <div className="row pt-5"><h4 className="col-md-12 mb-3">Mis Cursos:</h4>{teacherItem}</div>
        }

        const PAY_COURSES = myCourses.userPayments

        let alumnWrapper
        let alumnItem

        if(PAY_COURSES) {
            if(PAY_COURSES.length === 0) alumnItem = <p className="col-md-12">No tienes cursos</p>
            else {
                alumnItem = PAY_COURSES.map(course => (
                    <div key={course.id} className="col-md-3">
                        <CardCourse item={course} showCart={false} isPay={true} isStar={false} />
                    </div>
                ))
            }

            alumnWrapper = <div className="row py-5"><h4 className="col-md-12 mb-3">Cursos Comprados:</h4>{alumnItem}</div>
        }

        return(
            <div>
                {teacherWrapper}
                {alumnWrapper}
            </div>
        )

    }


    render() {

        return (
            <MasterTemplate>

                <div className="container" style={{ minHeight: '70vh', width: '100%' }}>
                    {this._renderContent()}
                </div>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps)(MyCourse)