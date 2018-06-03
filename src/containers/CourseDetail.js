import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import {Constant} from '../commons'
import Spinner from 'react-spinkit'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import {
    EditCourse,
    NewSection,
    TableContent
} from '../components'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import DescriptionIcon from '@material-ui/icons/Description'
import LivetvIcon from '@material-ui/icons/LiveTv'

import ReactStars from 'react-stars'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

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

    _isOwnerOfTheCourse = () => {
        const AUTH = this.props.auth

        //TODO: redirect if dont by this course
        //TODO: teacher own of this course
        return AUTH.rol === Constant.ADMIN || (AUTH.rol === Constant.TEACHER);

    }

    _renderHeader = (COURSE) => {
        return(
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

                            <p className="mt-1 f-s-12px">Creado por {(COURSE.user) ? COURSE.user.name : ''}</p>

                            {(this._isOwnerOfTheCourse()) ? (
                                <div>

                                    <Button variant="fab" mini color="secondary" aria-label="add" onClick={() => this.props.dispatch(actionCreators.courseChangeValue("dialogEditCourse", true))}>
                                        <EditIcon style={{ fontSize: 14 }} />
                                    </Button>

                                    <EditCourse course={COURSE} />
                                </div>
                            ) : null}

                        </div>

                        <div className="col-md-5">
                            <img src={`${COURSE.photo}`} alt={COURSE.name}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    _renderContent = () => {

        const COURSES = this.props.courses
        const COURSE = COURSES.course


        if(this._isOwnerOfTheCourse()) return this._renderOwnContent(COURSES, COURSE)

        return this._renderUserContent(COURSES, COURSE)
    }

    _renderOwnContent = (COURSES, COURSE) => {
        return(
            <div>

                {this._renderHeader(COURSE)}

                <div className="container course-wrapper">
                    <div className="d-flex align-items-center">
                        <h5 className="mr-3">Añadir Nueva Sección</h5>

                        <Button variant="fab" mini color="secondary" aria-label="add" onClick={(e) => this.props.dispatch(actionCreators.courseChangeValue("dialogNewSection", true))}>
                            <AddIcon />
                        </Button>

                        <NewSection course={COURSE} />

                    </div>

                    <div className="mt-3">
                        {this._renderOwnSection()}
                    </div>
                </div>

            </div>
        )
    }

    _renderOwnSection = () => {
        return(
            <TableContent />
        )
    }

    _renderUserContent = (COURSES, COURSE) => {

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

                {this._renderHeader(COURSE)}

                <div className="container course-wrapper">
                    <div className="row">
                        <div className="col-md-12">

                            {this._renderUserSection(SECTIONS)}

                        </div>
                    </div>
                </div>

            </div>
        )

    }

    _renderUserSection = (SECTIONS) => {

        let sections = SECTIONS.map(section => {

            let resources = section.resources.map(resource => {

                let modalData = resource.uri ? resource.uri : resource.quiz
                let modalType = resource.uri ? Constant.VIDEO : Constant.QUIZ

                return (
                    <ListItem
                        key={resource.id}
                        button
                        onClick={() => {
                            this.props.dispatch(actionCreators.courseChangeValue("modalData", modalData))
                            this.props.dispatch(actionCreators.openModal(modalType))
                        }}
                    >
                        <ListItemIcon>
                            {resource.uri ? <LivetvIcon /> : <DescriptionIcon />}
                        </ListItemIcon>
                        <ListItemText primary={resource.title} />
                    </ListItem>
                )

            })

            return(
                <ExpansionPanel key={section.id}>

                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{section.title}</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails className="d-block">
                        {resources}
                    </ExpansionPanelDetails>

                </ExpansionPanel>
            )

        })

        return(
            <div>
                <h5 className="mb-5">Contenido del curso</h5>
                {sections}
            </div>
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
        courses: state.courseReducer,
        auth: state.authReducer,
    }
}

export default connect(mapStateToProps)(CourseDetail)