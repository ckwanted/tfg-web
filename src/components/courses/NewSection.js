import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'

import {Constant} from '../../commons'

class NewSection extends Component {

    _handleClose = (TYPE) => {
        document.body.removeAttribute("style")

        if(TYPE === Constant.CREATE) this.props.dispatch(actionCreators.courseChangeValue("dialogNewSection", false))
        else this.props.dispatch(actionCreators.courseChangeValue("dialogEditSection", false))

        this.props.dispatch(actionCreators.courseChangeValue("title", '', "sectionSelected"))
    }

    render() {

        let {course, dialogNewSection, dialogEditSection, sectionSelected} = this.props.courses

        const TYPE = dialogEditSection ? Constant.EDIT : Constant.CREATE

        return(
            <div>
                <Dialog
                    className="visibility-child"
                    open={dialogNewSection || dialogEditSection}
                    onClose={() => this._handleClose(TYPE)}
                    aria-labelledby="form-dialog-title"
                >
                    <form
                        method="POST"
                        onSubmit={(e) => {
                            e.preventDefault()

                            if(TYPE === Constant.CREATE) {
                                this.props.dispatch(actionCreators.addNewSection(course.id, sectionSelected.title))
                            }
                            else {
                                this.props.dispatch(actionCreators.editSection(sectionSelected.id, sectionSelected.title))
                            }

                            this._handleClose(TYPE)
                        }}
                    >


                        <DialogTitle id="form-dialog-title">
                            <div className="d-flex">
                            {TYPE === Constant.CREATE ? 'Crear nueva sección' : 'Editar Sección'}
                            {TYPE === Constant.EDIT && sectionSelected.resourcesLength === 0 ?
                                <div className="ml-auto cursor-pointer">
                                    <DeleteIcon
                                        onClick={(e) => this.props.dispatch(actionCreators.removeSection(sectionSelected.id))}
                                    />
                                </div>
                                : null}
                            </div>
                        </DialogTitle>
                        <DialogContent>


                            <DialogContentText className="mb-3">
                                Las secciones pueden ser usadas para dividir los temas por capítulos
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={sectionSelected.title}
                                onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("title", e.target.value, "sectionSelected"))}
                                required
                            />


                        </DialogContent>
                        <DialogActions>
                            <button type="button" onClick={(e) => this._handleClose(TYPE)} className="button">
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

export default connect(mapStateToProps)(NewSection)

