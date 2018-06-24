import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import {Constant} from '../../commons'

class NewResource extends Component {

    _handleClose = (TYPE) => {
        document.body.removeAttribute("style")

        if(TYPE === Constant.CREATE) this.props.dispatch(actionCreators.courseChangeValue("dialogNewResource", false))
        else this.props.dispatch(actionCreators.courseChangeValue("dialogEditResource", false))

        //this.props.dispatch(actionCreators.courseChangeValue("sectionSelectedTitle", ''))
    }

    render() {

        let {dialogNewResource, dialogEditResource} = this.props.courses


        const TYPE = dialogEditResource ? Constant.EDIT : Constant.CREATE

        return(
            <div>
                <Dialog
                    className="visibility-child"
                    open={dialogNewResource || dialogEditResource}
                    onClose={() => this._handleClose(TYPE)}
                    aria-labelledby="form-dialog-title"
                >
                    <form
                        method="POST"
                        onSubmit={(e) => {
                            e.preventDefault()

                            if(TYPE === Constant.CREATE) {

                            }
                            else {

                            }

                            this._handleClose(TYPE)
                        }}
                    >


                        <DialogTitle id="form-dialog-title">
                            {TYPE === Constant.CREATE ? 'Crear nuevo item' : 'Editar item'}
                        </DialogTitle>
                        <DialogContent>


                            <DialogContentText className="mb-3">

                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Nombre"
                                type="text"
                                fullWidth
                                //value={sectionSelectedTitle}
                                //onChange={(e) => this.props.dispatch(actionCreators.courseChangeValue("sectionSelectedTitle", e.target.value))}
                                //required
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

export default connect(mapStateToProps)(NewResource)

