import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

class EditCourse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            description: null,
        }
    }

    _handleClose = () => {
        document.body.removeAttribute("style")
        this.props.dispatch(actionCreators.courseChangeValue("dialogEditCourse", false))
    }

    render() {

        const COURSE = this.props.course
        let {dialogEditCourse} = this.props.courses

        if(!COURSE) return null

        return(
            <div>
                <Dialog
                    className="visibility-child"
                    open={dialogEditCourse}
                    onClose={(e) => this._handleClose()}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Editar Curso</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="mb-3">

                        </DialogContentText>
                        <form action="#" onSubmit={(e) => {
                            //TODO: submit
                            e.preventDefault()
                            this._handleClose()
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

                            {/*<Select*/}
                                {/*value={this.state.age}*/}
                                {/*onChange={this.handleChange}*/}
                                {/*inputProps={{*/}
                                    {/*name: 'age',*/}
                                    {/*id: 'age-simple',*/}
                                {/*}}*/}
                            {/*>*/}
                                {/*<MenuItem value="">*/}
                                    {/*<em>None</em>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem value={10}>Ten</MenuItem>*/}
                                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                                {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                            {/*</Select>*/}

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
        )
    }

}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer,
    }
}

export default connect(mapStateToProps)(EditCourse)

