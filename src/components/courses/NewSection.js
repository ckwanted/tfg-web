import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

class NewSection extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newSection: ''
        }
    }

    _handleClose = () => {
        document.body.removeAttribute("style")
        this.props.dispatch(actionCreators.courseChangeValue("dialogNewSection", false))
    }

    render() {

        const COURSE = this.props.course
        let {dialogNewSection} = this.props.courses

        if(!COURSE) return null

        return(
            <div>
                <Dialog
                    className="visibility-child"
                    open={dialogNewSection}
                    onClose={this._handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form
                        method="POST"
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.props.dispatch(actionCreators.addNewSection(this.state.newSection))
                            this.setState({newSection: ''})
                            this._handleClose()
                        }}
                    >


                        <DialogTitle id="form-dialog-title">Crear nueva sección</DialogTitle>
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
                                value={this.state.newSection}
                                onChange={(e) => this.setState({newSection: e.target.value})}
                                required
                            />


                        </DialogContent>
                        <DialogActions>
                            <button type="button" onClick={(e) => this._handleClose()} className="button">
                                Cerrar
                            </button>
                            <button className="button" type="submit">
                                Crear
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

