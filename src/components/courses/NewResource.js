import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'

import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import {Constant} from '../../commons'
import LinearProgress from '@material-ui/core/LinearProgress'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class NewResource extends Component {

    fileSelectedHandle = (event) => {
        this.props.dispatch(actionCreators.courseChangeValue("selectedFile", event.target.files[0], "resourceSelected"))
    }

    _handleClose = () => {
        document.body.removeAttribute("style")

        this.props.dispatch(actionCreators.resetResource())
    }

    _renderTab = (resourceSelected) => {
        return resourceSelected.quiz.map((item, i) => {
            return(
                <Tab key={i} label={`Pregunta ${i + 1}`} />
            )
        })
    }

    _renderTabContent = (resourceSelected) => {
        const value = resourceSelected.value

        if(resourceSelected.quiz.length) {
            const selectedQuiz = resourceSelected.quiz[value]

            return(
                <div>

                    <div>
                        <TextField
                            className="col-md-6 pr-1"
                            name="title"
                            margin="dense"
                            label="Pregunta"
                            value={selectedQuiz.question}
                            onChange={(e) => this.props.dispatch(actionCreators.editQuestionQuiz(e.target.value))}
                            required
                        />

                        <FormControl className="col-md-6">
                            <InputLabel htmlFor="select-type-resource">Respuesta Correcta</InputLabel>
                            <NativeSelect
                                inputProps={{id: 'select-type-result'}}
                                value={selectedQuiz.result}
                                onChange={(e) => {
                                    this.props.dispatch(actionCreators.editResultQuiz(e.target.value))
                                }}
                            >
                                {selectedQuiz.answers.map( (answer, i) => {
                                    return <option key={i} value={i}>{i+1}</option>
                                })}
                            </NativeSelect>
                        </FormControl>

                    </div>

                    <div className="mt-3 d-flex">
                        <span>Respuestas:</span>
                        <AddIcon
                            className="ml-1 cursor-pointer"
                            style={styleIcon}
                            onClick={(e) => this.props.dispatch(actionCreators.addAnswerQuiz())}
                        />
                    </div>

                    <div>
                        {selectedQuiz.answers.map((answer, i) => {
                            return(
                                <div key={i}>
                                    <TextField
                                        name="title"
                                        margin="dense"
                                        label={`Respuesta ${i + 1}`}
                                        value={answer}
                                        onChange={(e) => {
                                            this.props.dispatch(actionCreators.editAnswerQuiz(i, e.target.value))
                                        }}
                                        required
                                    />
                                    {selectedQuiz.answers.length > 1 ?
                                        <DeleteIcon
                                            className="cursor-pointer ml-3"
                                            style={styleIcon}
                                            onClick={(e) => {
                                                if(window.confirm("¿Quieres eliminar esta respuesta?")) {
                                                    this.props.dispatch(actionCreators.removeAnswerQuiz(i))
                                                }
                                            }}
                                        />
                                        :
                                        null
                                    }
                                </div>
                            )
                        })}
                    </div>

                </div>
            )
        }
    }

    _renderContent = (defaultResource, TYPE) => {

        let {resourceSelected} = this.props.courses

        let content
        let fileName = ''

        if(resourceSelected.selectedFile) fileName = resourceSelected.selectedFile.name

        // VIDEO
        if(resourceSelected.type === defaultResource || resourceSelected.type === null || resourceSelected.type === undefined) {
            content = (
                <div className="mt-3">
                    <Button color="default" onClick={(e) => this.refs.input.click()}>
                        Subir Video
                        <CloudUploadIcon className="pl-2" />
                    </Button>

                    <input
                        name="file"
                        ref="input"
                        type="file"
                        accept="video/*"
                        onChange={this.fileSelectedHandle}
                        required={TYPE === Constant.CREATE}
                        style={{opacity: 0}}
                    />

                    <p>{fileName}</p>

                    {resourceSelected.progress ?
                        <LinearProgress
                            variant="determinate"
                            value={resourceSelected.progress}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0
                            }}
                        />
                        : null
                    }

                </div>
            )
        }
        // QUIZ
        else {

            const value = resourceSelected.value

            content = (
                <div className="mt-3 resource-quiz">

                    <div className="d-flex justify-content-end">
                        <AddIcon
                            className="cursor-pointer"
                            style={styleIcon}
                            onClick={(e) => this.props.dispatch(actionCreators.addQuiz())}
                        />

                        {resourceSelected.quiz.length > 1 ?
                            <DeleteIcon
                                className="cursor-pointer ml-3"
                                style={styleIcon}
                                onClick={(e) => {
                                    if(window.confirm("¿Quieres eliminar esta pregunta?")) {
                                        this.props.dispatch(actionCreators.removeQuiz(value))
                                    }
                                }}
                            />
                            : null
                        }
                    </div>

                    <AppBar position="static" style={{background: 'transparent', boxShadow: 'none', color: 'black'}}>
                        <Tabs
                            value={value}
                            onChange={(e, value) => this.props.dispatch(actionCreators.courseChangeValue("value", value, "resourceSelected"))}
                        >

                            {this._renderTab(resourceSelected)}
                        </Tabs>
                    </AppBar>

                    {this._renderTabContent(resourceSelected)}

                </div>
            )
        }



        return(
            <div>

                <FormControl className="mt-3">
                    <InputLabel htmlFor="select-type-resource">Tipo</InputLabel>
                    <NativeSelect
                        inputProps={{id: 'select-type-resource'}}
                        value={resourceSelected.type || defaultResource}
                        onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("type", e.target.value, 'resourceSelected'))}
                    >
                        {Constant.RESOURCE.map( (resource, i) => {
                            return <option key={i} value={resource.value}>{resource.name}</option>
                        })}
                    </NativeSelect>
                </FormControl>

                <TextField
                    className="mt-3"
                    name="title"
                    margin="dense"
                    label="Título del Recurso"
                    fullWidth
                    value={resourceSelected.title}
                    onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("title", e.target.value, 'resourceSelected'))}
                    required
                />


                {content}

            </div>
        )
    }

    render() {

        let {dialogNewResource, dialogEditResource, resourceSelected} = this.props.courses

        const defaultResource = Constant.RESOURCE[0] ? Constant.RESOURCE[0].value : false
        const TYPE = dialogEditResource ? Constant.EDIT : Constant.CREATE

        const progress = resourceSelected.progress ? resourceSelected.progress : null

        return(
            <div>
                <Dialog
                    className="visibility-child"
                    open={dialogNewResource || dialogEditResource}
                    onClose={() => {
                        if(!progress) this._handleClose()
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <form
                        method="POST"
                        encType="multipart/form-data"
                        onSubmit={(e) => {
                            e.preventDefault()

                            if(TYPE === Constant.CREATE) {
                                if(resourceSelected.type === defaultResource || resourceSelected.type === null || resourceSelected.type === undefined) {
                                    this.props.dispatch(actionCreators.addNewResource(resourceSelected.selectedFile))
                                }
                                else this.props.dispatch(actionCreators.addNewResource())

                            }
                            else {

                                if(resourceSelected.type === defaultResource || resourceSelected.type === null || resourceSelected.type === undefined) {
                                    this.props.dispatch(actionCreators.editResource(resourceSelected.selectedFile))
                                }
                                else this.props.dispatch(actionCreators.editResource())

                            }

                        }}
                    >


                        <DialogTitle id="form-dialog-title">
                            <div className="d-flex">
                            {TYPE === Constant.CREATE ? 'Nuevo Recurso' : 'Editar Recurso'}
                            {TYPE === Constant.EDIT ?
                                <div className="ml-auto cursor-pointer">
                                    <DeleteIcon
                                        onClick={(e) => {
                                            if(window.confirm("¿Quieres eliminar este recurso?")) this.props.dispatch(actionCreators.removeResource())
                                        }}
                                    />
                                </div>
                                : null}
                            </div>
                        </DialogTitle>
                        <DialogContent>

                            <DialogContentText>
                                Los recursos añaden contenido a las secciones
                            </DialogContentText>

                            {this._renderContent(defaultResource, TYPE)}

                        </DialogContent>
                        <DialogActions>
                            <button
                                type="button"
                                className="button"
                                onClick={(e) => {
                                    if(!progress) this._handleClose()
                                }}>
                                Cerrar
                            </button>
                            <button className="button" type="submit">
                                {TYPE === Constant.CREATE ? 'Crear' : 'Editar'}
                            </button>
                        </DialogActions>

                    </form>
                </Dialog>
            </div>
        )
    }

}

const styleIcon = {
    background: 'rgba(0,0,0,.1)',
    borderRadius: '50%',
    padding: '5px'
}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer,
    }
}

export default connect(mapStateToProps)(NewResource)

