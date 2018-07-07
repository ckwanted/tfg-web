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

import {Constant} from '../../commons'

class EditUser extends Component {

    _handleClose = () => {
        document.body.removeAttribute("style")
        this.props.dispatch(actionCreators.userChangeValue("modal", false))
    }

    render() {

        let {userSelected, modal} = this.props.user

        return(
            <div>
                <Dialog
                    className="visibility-child"
                    open={modal}
                    onClose={() => this._handleClose()}
                    aria-labelledby="form-dialog-title"
                >
                    <form
                        method="POST"
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.props.dispatch(actionCreators.userUpdate())
                        }}
                    >


                        <DialogTitle id="form-dialog-title">
                            <div className="d-flex">Editar usuario</div>
                        </DialogTitle>
                        <DialogContent>


                            <DialogContentText className="mb-3">
                                Esta operación modificará los valores del usuario
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={userSelected.name}
                                onChange={(e) => this.props.dispatch(actionCreators.userChangeValue("name", e.target.value, "userSelected"))}
                                required
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                label="Apellido"
                                type="text"
                                fullWidth
                                value={userSelected.last_name}
                                onChange={(e) => this.props.dispatch(actionCreators.userChangeValue("last_name", e.target.value, "userSelected"))}
                                required
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                label="Apellido"
                                type="email"
                                fullWidth
                                value={userSelected.email}
                                onChange={(e) => this.props.dispatch(actionCreators.userChangeValue("email", e.target.value, "userSelected"))}
                                required
                            />

                            <FormControl className="mt-3">
                                <InputLabel htmlFor="select-skill-level">Dificultad</InputLabel>
                                <NativeSelect
                                    inputProps={{id: 'select-rol'}}
                                    value={userSelected.rol}
                                    onChange={(e) => this.props.dispatch(actionCreators.userChangeValue("rol", e.target.value, "userSelected"))}
                                >
                                    {Constant.ROLES.map( (rol, i) => {
                                        return <option key={i} value={rol.value}>{rol.name}</option>
                                    })}
                                </NativeSelect>
                            </FormControl>


                        </DialogContent>
                        <DialogActions>
                            <button type="button" onClick={(e) => this._handleClose()} className="button">
                                Cerrar
                            </button>
                            <button className="button" type="submit">
                                Editar
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
        user: state.userReducer,
    }
}

export default connect(mapStateToProps)(EditUser)

