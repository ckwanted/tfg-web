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

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

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

        this.props.dispatch(actionCreators.searchCourse())
    }

    render() {

        const {q, ckFrontEnd, ckBackEnd, ckFullStack, ckDevOps, ckAndroid, ckIos, ckBeginner, ckIntermediate, ckAdvanced} = this.props.courses

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

                                        <FormGroup className="checkbox-filter">

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckFrontEnd}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckFrontEnd", e.target.checked))}
                                                        value={`${ckFrontEnd}`}
                                                    />
                                                }
                                                label="Front End"
                                            />

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckBackEnd}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckBackEnd", e.target.checked))}
                                                        value={`${ckBackEnd}`}
                                                    />
                                                }
                                                label="Back End"
                                            />

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckFullStack}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckFullStack", e.target.checked))}
                                                        value={`${ckFullStack}`}
                                                    />
                                                }
                                                label="Full Stack"
                                            />

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckDevOps}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckDevOps", e.target.checked))}
                                                        value={`${ckDevOps}`}
                                                    />
                                                }
                                                label="Dev Ops"
                                            />


                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckAndroid}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckAndroid", e.target.checked))}
                                                        value={`${ckAndroid}`}
                                                    />
                                                }
                                                label="Android"
                                            />

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckIos}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckIos", e.target.checked))}
                                                        value={`${ckIos}`}
                                                    />
                                                }
                                                label="IOS"
                                            />

                                        </FormGroup>

                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h5>Dificultad</h5>
                                    <div className="mt-3">

                                        <FormGroup className="checkbox-filter">

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckBeginner}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckBeginner", e.target.checked))}
                                                        value={`${ckBeginner}`}
                                                    />
                                                }
                                                label="Principiante"
                                            />

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckIntermediate}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckIntermediate", e.target.checked))}
                                                        value={`${ckIntermediate}`}
                                                    />
                                                }
                                                label="Intermedio"
                                            />

                                            <FormControlLabel
                                                style={{marginBottom: 0}}
                                                control={
                                                    <Checkbox
                                                        checked={ckAdvanced}
                                                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("ckAdvanced", e.target.checked))}
                                                        value={`${ckAdvanced}`}
                                                    />
                                                }
                                                label="Avanzado"
                                            />

                                        </FormGroup>

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