import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import Spinner from 'react-spinkit'

import {
    CardCourse
} from '../components'

class Course extends Component {

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchAllCourses())
    }

    _handleSubmit = (e) => {
        e.preventDefault()
    }

    _renderCourses() {
        const COURSES = this.props.courses

        if(COURSES.loading) return <Spinner name="folding-cube" color="#42648e"/>

        return COURSES.data.map((course) => {
            return (
                <div key={course.id} className="col-md-6 col-lg-4">
                    <CardCourse item={course} />
                </div>
            )
        })

    }

    render() {

        return (
            <MasterTemplate>

                <section className="container course-wrapper">
                    <div className="row">

                        <div className="col-md-3">

                            <div className="position-relative">
                                <input
                                    className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                                    type="text"
                                    placeholder="Busca tu curso"
                                />
                                <i className="fa fa-search input-icon" aria-hidden="true" />
                            </div>

                            <div className="mt-3">
                                <h5>Categorías</h5>
                                <p>111111</p>
                            </div>

                        </div>

                        <div className="col-md-9">

                            <div className="row justify-content-center">
                                {this._renderCourses()}
                            </div>

                        </div>

                    </div>
                </section>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps)(Course)