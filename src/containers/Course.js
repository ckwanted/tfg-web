import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import Spinner from 'react-spinkit'
import {Constant} from '../commons'

import {
    CardCourse
} from '../components'

import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

class Course extends Component {

    componentWillMount() {
        this.props.fetchAllCourses()
    }

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll)
    }

    _handleScroll = (e) => {
        const FILTER = this.refs.filter
        const SCROLL_Y = window.scrollY
        const WIDTH = window.innerWidth

        if(SCROLL_Y > 500 && WIDTH < Constant.Breakpoints.sm) FILTER.style.opacity = 0
        else FILTER.style.opacity = 1

        FILTER.style.transform = `translateY(${SCROLL_Y}px)`
    }

    _renderCourses = () => {
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

    _handleSubmit = (e) => {
        e.preventDefault()
        alert("Submit")
    }

    render() {

        const CHECKBOX_STYLE_ICON = {
            marginRight: '5px',
            fill: '#42648e',
        }

        const CHECKBOX_STYLE_LABEL = {
            fontSize: '15px'
        }

        return (
            <MasterTemplate>

                <section className="container course-wrapper">
                    <div className="row">

                        <div className="col-md-3">

                            <form ref="filter" className="filter-wrapper" onSubmit={this._handleSubmit}>

                                <div className="position-relative">
                                    <input
                                        className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                                        type="text"
                                        placeholder="Busca tu curso"
                                    />
                                    <i className="fa fa-search input-icon" aria-hidden="true" />
                                </div>

                                <div className="mt-3">
                                    <h5>Categoría</h5>
                                    <div className="mt-3">

                                        <Checkbox
                                            label="Front End"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="Back End"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="Full Stack"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="Dev Ops"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="Android"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="IOS"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h5>Dificultad</h5>
                                    <div className="mt-3">

                                        <Checkbox
                                            label="Principiante"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="Intermedio"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                        <Checkbox
                                            label="Avanzado"
                                            iconStyle={CHECKBOX_STYLE_ICON}
                                            labelStyle={CHECKBOX_STYLE_LABEL}
                                        />

                                    </div>
                                </div>

                                <div className="mt-3">
                                    <RaisedButton type="submit" label="Buscar" backgroundColor="#42648e" labelColor="#FFF" />
                                </div>

                            </form>


                        </div>

                        <div className="col-md-9">

                            <div className="row justify-content-center card-course-wrapper">
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

export default connect(mapStateToProps, actionCreators)(Course)