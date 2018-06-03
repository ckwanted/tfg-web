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

class EditCourse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.course.name ? this.props.course.name : '',
            description: this.props.course.description ? this.props.course.description : '',
            price: this.props.course.price ? this.props.course.price : '',
            category: this.props.course.category ? this.props.course.category : "other",
            skill_level: this.props.course.skill_level ? this.props.course.skill_level : "beginner",
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
                    <form
                        method="POST"
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.props.dispatch(actionCreators.updateCourse(
                                COURSE.id, this.state.name, this.state.description, this.state.category, this.state.skill_level, this.state.price)
                            )
                            this._handleClose()
                        }}
                    >
                        <DialogTitle id="form-dialog-title">Editar Curso</DialogTitle>
                        <DialogContent>
                            <DialogContentText className="mb-3">

                            </DialogContentText>

                                <TextField
                                    margin="dense"
                                    label="Nombre"
                                    fullWidth
                                    value={this.state.name}
                                    onChange={(e) => this.setState({name: e.target.value})}
                                    required
                                />

                                <TextField
                                    className="mt-3"
                                    multiline
                                    margin="dense"
                                    label="Descripción"
                                    fullWidth
                                    value={this.state.description}
                                    onChange={(e) => this.setState({description: e.target.value})}
                                    required
                                />

                                <TextField
                                    className="mt-3"
                                    margin="dense"
                                    label="Precio"
                                    fullWidth
                                    value={this.state.price}
                                    onChange={(e) => {
                                        const VALUE = e.target.value
                                        //const LAST_CHAR = VALUE[VALUE.length - 1]

                                        this.setState({price: VALUE})

                                    }}
                                    required
                                />

                                <FormControl className="mt-3">
                                    <InputLabel htmlFor="select-category">Categoría</InputLabel>
                                    <NativeSelect
                                        inputProps={{id: 'select-category'}}
                                        value={this.state.category}
                                        onChange={(e) => this.setState({category: e.target.value}) }
                                    >
                                        {Constant.CATEGORIES.map( (category, i) => {
                                            return <option key={i} value={category.value}>{category.name}</option>
                                        })}
                                    </NativeSelect>
                                </FormControl>

                                <FormControl className="mt-3 ml-3">
                                    <InputLabel htmlFor="select-skill-level">Dificultad</InputLabel>
                                    <NativeSelect
                                        inputProps={{id: 'select-skill-level'}}
                                        value={this.state.skill_level}
                                        onChange={(e) => this.setState({skill_level: e.target.value}) }
                                    >
                                        {Constant.SKILL_LEVEL.map( (skill, i) => {
                                            return <option key={i} value={skill.value}>{skill.name}</option>
                                        })}
                                    </NativeSelect>
                                </FormControl>

                        </DialogContent>
                        <DialogActions>
                            <button
                                type="button"
                                className="button"
                                onClick={(e) => {
                                    this.setState({
                                        name: this.props.course.name ? this.props.course.name : '',
                                        description: this.props.course.description ? this.props.course.description : '',
                                        price: this.props.course.price ? this.props.course.price : '',
                                        category: this.props.course.category ? this.props.course.category : "other",
                                        skill_level: this.props.course.skill_level ? this.props.course.skill_level : "beginner",
                                    })
                                    this._handleClose('openEditCourse')
                                }}
                            >
                                Cerrar
                            </button>

                            <button type="submit" className="button">
                                Actualizar
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

export default connect(mapStateToProps)(EditCourse)

