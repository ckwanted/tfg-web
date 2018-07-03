import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import {connect} from 'react-redux'
import * as actionCreators from '../actions'
import iziToast from 'izitoast'

class ResetPassword extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            password_confirmation: ''

        }
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        const {token, email} = this.props.match.params
        const {password, password_confirmation} = this.state

        if(password !== password_confirmation) {
            iziToast.error({
                title: '',
                message: 'Las contraseñas no coinciden',
                position: 'topRight'
            })
        }
        else if(password.length < 6) {
            iziToast.error({
                title: '',
                message: 'Las contraseñas debe tener como mínimo 6 caracteres',
                position: 'topRight'
            })
        }
        else this.props.dispatch(actionCreators.passwordReset(token, email, password, password_confirmation))
    }

    render() {

        return (
            <MasterTemplate>

                <section style={{height: '50vh'}}>

                    <form
                        className="container d-flex flex-wrap align-items-center h-100"
                        method="POST"
                        onSubmit={this._handleSubmit}
                    >
                        <div className="d-flex flex-wrap w-100">
                            <input
                                className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                                type="password"
                                placeholder="Nueva Contraseña ..."
                                value={this.state.password}
                                onChange={(e) => this.setState({password: e.target.value})}
                                required
                            />
                            <input
                                className="mt-3 input m-0 p-l-30px w-100 bg-white basic-shadow"
                                type="password"
                                placeholder="Repite La Contraseña ..."
                                value={this.state.password_confirmation}
                                onChange={(e) => this.setState({password_confirmation: e.target.value})}
                                required
                            />
                            <div className="w-100 mt-3">
                                <button type="submit" className="button">
                                    restablecer
                                </button>
                            </div>
                        </div>
                    </form>

                </section>

            </MasterTemplate>
        )

    }

}

export default connect()(ResetPassword)