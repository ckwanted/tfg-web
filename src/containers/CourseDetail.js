import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import {Constant} from '../commons'
import Spinner from 'react-spinkit'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import {List, ListItem} from 'material-ui/List'
import DescriptionIcon from 'material-ui/svg-icons/action/description'
import SchoolIcon from 'material-ui/svg-icons/social/school'
import LivetvIcon from 'material-ui/svg-icons/notification/live-tv'

import ReactStars from 'react-stars'

class CourseDetail extends Component {

    componentWillMount() {
        const {slug} = this.props.match.params
        this.props.dispatch(actionCreators.fetchCourse(slug))
    }

    _renderLoading = () => {
        const COURSES = this.props.courses

        if(COURSES.loading) {
            return(
                <div className="d-flex justify-content-center">
                    <Spinner name="folding-cube" color="#42648e"/>
                </div>
            )
        }
    }

    _renderContent = () => {
        const COURSES = this.props.courses
        const COURSE = COURSES.course

        if(!COURSE || Object.keys(COURSE).length === 0) {
            return(
                <div className="d-flex justify-content-center align-items-center" style={{height: '400px'}}>
                    No existe este curso
                </div>
            )
        }

        const SECTIONS = COURSE.sections

        return(
            <div>

                <div style={{boxShadow: '0 10px 20px rgba(0,0,0,0.1)'}}>
                    <div className="container course-wrapper">
                        <div className="row align-items-center">

                            <div className="col-md-7">
                                <h5 className="f-s-30px">{COURSE.name}</h5>
                                <p className="f-s-14px">{COURSE.description}</p>

                                <div className="d-flex">

                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        value={Number(COURSE.star)}
                                        size={12}
                                        color2={'#ffd700'}
                                    />

                                    <span className="ml-1 f-s-12px">{COURSE.star} ({COURSE.votes} valoraciones)</span>

                                </div>

                                <p className="mt-1 f-s-12px">Creado por {COURSE.user.name}</p>
                            </div>

                            <div className="col-md-5">
                                <img src={`${COURSE.photo}`} alt={COURSE.name}/>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container course-wrapper">
                    <div className="row">
                        <div className="col-md-12">

                            {this._renderSection(SECTIONS)}

                        </div>
                    </div>
                </div>

            </div>
        )

    }

    _renderSection = (SECTIONS) => {

        let data = SECTIONS.map(section => {

            let resources = section.resources.map(resource => {

                let modalData = resource.uri ? resource.uri : resource.quiz

                return(
                    <ListItem
                        key={resource.id}
                        primaryText={resource.title}
                        leftIcon={resource.uri ? <LivetvIcon /> : <DescriptionIcon />}
                        onClick={() => {
                            this.props.dispatch(actionCreators.courseChangeValue("modalData", modalData))
                            this.props.dispatch(actionCreators.openModal(Constant.VIDEO))
                        }}
                    />
                )
            })

            return(
                <ListItem
                    key={section.id}
                    primaryText={section.title}
                    leftIcon={<SchoolIcon />}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={resources}
                />
            )

        })

        return(
            <List>
                {data}
            </List>
        )
    }

    render() {

        const COURSES = this.props.courses

        return (
            <MasterTemplate>

                <section>

                    {this._renderLoading()}
                    {(!COURSES.loading) ? this._renderContent() : null}

                </section>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        router: state.routerReducer,
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps)(CourseDetail)