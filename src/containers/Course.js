import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-spinkit'
import {Constant} from '../commons'

import {
    CardCourse
} from '../components'

import Checkbox from 'material-ui/Checkbox'

class Course extends Component {

    componentWillMount() {
        const COURSES = this.props.courses

        if(!COURSES.data.length) {
            this.props.dispatch( actionCreators.fetchAllCourses() )
        }

        this.body = document.querySelector("body")
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
        const HEIGHT = this.body.scrollHeight

        const COURSES = this.props.courses

        if(SCROLL_Y > 500 && WIDTH < Constant.Breakpoints.sm) FILTER.style.opacity = 0
        else FILTER.style.opacity = 1

        if(COURSES.data.length && SCROLL_Y < (HEIGHT - 1000) ) FILTER.style.transform = `translateY(${SCROLL_Y}px)`

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

    _handleSubmit = (e, q) => {
        e.preventDefault()

        this.props.dispatch(actionCreators.searchCourse(q))
    }

    render() {

        const {q} = this.props.courses

        const CHECKBOX_STYLE_ICON = {
            marginRight: '5px',
            fill: '#42648e',
        }

        const CHECKBOX_STYLE_LABEL = {
            fontSize: '14px'
        }

        return (
            <MasterTemplate>

                <section className="container course-wrapper">
                    <div className="row">

                        <div className="col-md-3">

                            <form ref="filter" className="filter-wrapper" onSubmit={(e) => this._handleSubmit(e, q)}>

                                <div className="position-relative">
                                    <input
                                        className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                                        type="text"
                                        placeholder="Busca tu curso"
                                        value={q}
                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("q", e.target.value))}
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
                                    <button type="submit" className="button">
                                        Buscar
                                    </button>
                                </div>

                            </form>


                        </div>

                        <div className="col-md-9">

                            <InfiniteScroll
                                pageStart={1}
                                loadMore={() => console.warn("next page")}
                                hasMore={false}
                                loader={<div className="loader" key={0}>Loading ...</div>}
                            >

                                <div className="row justify-content-center card-course-wrapper">
                                    {this._renderCourses()}
                                </div>

                            </InfiniteScroll>

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