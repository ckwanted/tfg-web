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

import {Constant} from '../../commons'
import LinearProgress from '@material-ui/core/LinearProgress'

class NewResource extends Component {

    fileSelectedHandle = (event) => {
        this.props.dispatch(actionCreators.courseChangeValue("selectedFile", event.target.files[0], "resourceSelected"))
    }

    _handleClose = () => {
        document.body.removeAttribute("style")

        this.props.dispatch(actionCreators.resetResource())
    }

    _renderContent = (defaultResource) => {

        let {resourceSelected} = this.props.courses

        let content
        let fileName = ''

        if(resourceSelected.selectedFile) fileName = resourceSelected.selectedFile.name

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
                        required
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
        else {

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
                    name="title"
                    margin="dense"
                    label="Título"
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
                                else {
                                    this.props.dispatch(actionCreators.addNewResource())
                                }
                            }
                            else {

                            }

                        }}
                    >


                        <DialogTitle id="form-dialog-title">
                            {TYPE === Constant.CREATE ? 'Nuevo Recurso' : 'Editar Recurso'}
                        </DialogTitle>
                        <DialogContent>

                            <DialogContentText className="mb-3">
                                Los recursos añaden contenido a las secciones
                            </DialogContentText>

                            {this._renderContent(defaultResource)}

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

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer,
    }
}

export default connect(mapStateToProps)(NewResource)

