import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import {Constant} from '../commons'
import Spinner from 'react-spinkit'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

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

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class CourseDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openEditCourse: false,
            openNewSection: false,

            name: null,
            description: null,
            newSection: '',

        }
    }

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

    _handleClose = (stateName) => {
        document.body.removeAttribute("style")
        this.setState({[stateName]: false})
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

                            <div>
                                <Button variant="fab" mini color="secondary" aria-label="add" onClick={() => this.setState({openEditCourse: true})}>
                                    <EditIcon style={{ fontSize: 14 }} />
                                </Button>
                                <Dialog
                                    className="visibility-child"
                                    open={this.state.openEditCourse}
                                    onClose={(e) => this._handleClose('openEditCourse')}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">Editar Curso</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText className="mb-3">

                                        </DialogContentText>
                                        <form action="#" onSubmit={(e) => {
                                            //TODO: submit
                                            e.preventDefault()
                                            this._handleClose('openEditCourse')
                                        }}
                                        >

                                            <TextField
                                                margin="dense"
                                                label="Nombre"
                                                fullWidth
                                                value={(this.state.name) ? this.state.name : COURSE.name}
                                                onChange={(e) => this.setState({name: e.target.value})}
                                                required
                                            />

                                            <TextField
                                                multiline
                                                margin="dense"
                                                label="Descripción"
                                                fullWidth
                                                value={(this.state.description) ? this.state.description : COURSE.description}
                                                onChange={(e) => this.setState({description: e.target.value})}
                                                required
                                            />

                                        </form>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            size="small"
                                            onClick={(e) => {
                                                this.setState({
                                                    name: null,
                                                    description: null
                                                })
                                                this._handleClose('openEditCourse')
                                            }}
                                        >
                                            Cerrar
                                        </Button>
                                        <Button size="small" type="submit">
                                            Actualizar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

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

        const AUTH = this.props.auth

        const COURSES = this.props.courses
        const COURSE = COURSES.course

        //TODO: redirect if dont by this course
        //TODO: teacher own of this course
        if(AUTH.rol === Constant.ADMIN || (AUTH.rol === Constant.TEACHER) ) return this._renderOwnContent(COURSES, COURSE)

        return this._renderUserContent(COURSES, COURSE)
    }

    _renderOwnContent = (COURSES, COURSE) => {
        return(
            <div>

                {this._renderHeader(COURSE)}

                <div className="container course-wrapper">
                    <div className="d-flex align-items-center">
                        <h5>Contenido del curso</h5>
                        <div className="ml-auto">
                            <Button variant="fab" mini color="secondary" aria-label="add" onClick={(e) => this.setState({openNewSection: true})}>
                                <AddIcon />
                            </Button>
                            <Dialog
                                className="visibility-child"
                                open={this.state.openNewSection}
                                onClose={this._handleClose}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title">Crear nueva sección</DialogTitle>
                                <DialogContent>

                                    <form
                                        onSubmit={(e) => {
                                            //TODO: submit
                                            e.preventDefault()
                                            this.setState({newSection: ''})
                                            this._handleClose()
                                        }}
                                    >

                                        <DialogContentText className="mb-3">
                                            Las secciones pueden ser usadas para dividir los temas por capítulos
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Nombre"
                                            type="text"
                                            fullWidth
                                            value={this.state.newSection}
                                            onChange={(e) => this.setState({newSection: e.target.value})}
                                        />

                                        

                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={(e) => this._handleClose('openNewSection')} size="small">
                                        Cerrar
                                    </Button>
                                    <Button type="submit" size="small">
                                        Crear
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                    <div className="mt-3">
                        {this._renderOwnSection()}
                    </div>
                </div>

            </div>
        )
    }

    _renderOwnSection = (COURSES, COURSE) => {
        return null
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