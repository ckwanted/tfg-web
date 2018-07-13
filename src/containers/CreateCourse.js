import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {Constant} from '../commons'
import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import TextField from '@material-ui/core/TextField'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'

import iziToast from 'izitoast'
import LinearProgress from '@material-ui/core/LinearProgress'

class CreateCourse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            price: '',
            category: 'other',
            skill_level: 'beginner',
            selectedFile: null,
        }
    }

    fileSelectedHandle = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    _handleSubmit = (e) => {
        e.preventDefault()
        const {name, description, price, category, skill_level, selectedFile} = this.state

        if(!Number(price)) {
            iziToast.error({
                title: '',
                message: 'El precio debe ser numérico',
                position: 'topRight'
            })
        }
        else this.props.dispatch(actionCreators.createCourse(name, description, price, category, skill_level, selectedFile))
    }

    render() {

        const {progress} = this.props.courses

        return (
            <MasterTemplate>

                <div className="container" style={{ minHeight: '70vh', width: '100%' }}>

                    <form className="row py-5" onSubmit={this._handleSubmit}>

                        <div className="col-md-12">

                            {progress ?
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                />
                                : null
                            }

                            <h4>Crear Curso</h4>

                            <TextField
                                autoFocus
                                margin="dense"
                                label="Nombre"
                                type="text"
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
                                    this.setState({price: VALUE})
                                }}
                                required
                            />

                            <FormControl className="mt-3">
                                <InputLabel htmlFor="select-category">Categoría</InputLabel>
                                <NativeSelect
                                    inputProps={{id: 'create-select-category'}}
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
                                    inputProps={{id: 'create-select-skill-level'}}
                                    value={this.state.skill_level}
                                    onChange={(e) => this.setState({skill_level: e.target.value}) }
                                >
                                    {Constant.SKILL_LEVEL.map( (skill, i) => {
                                        return <option key={i} value={skill.value}>{skill.name}</option>
                                    })}
                                </NativeSelect>
                            </FormControl>

                            <div className="w-100 mt-3">
                                <p>Imagen:</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.fileSelectedHandle}
                                    required
                                />
                            </div>

                            <div className="w-100 mt-3">
                                <button type="submit" className="button">
                                    Crear
                                </button>
                            </div>

                        </div>

                    </form>

                </div>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer,
    }
}

export default connect(mapStateToProps)(CreateCourse)