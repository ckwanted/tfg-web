import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

class Register extends Component {

    _handleSubmit = (e) =>  {
        e.preventDefault()

        this.props.dispatch(actionCreators.authRegister())
    }

    render() {

        const {authChangeValue} = this.props
        const AUTH = this.props.auth

        return (
            <div className="modal-content">

                <img
                    className="modal-content__logo"
                    src="/images/graduate.png"
                    alt="logo"
                    style={styles.logo}
                />

                <form onSubmit={this._handleSubmit}>

                    <label className="label">
                        Nombre
                        <input
                            type="text"
                            className="input w-100"
                            value={AUTH.register_name}
                            onChange={(e) => authChangeValue("register_name", e.target.value)}
                            required
                        />
                    </label>

                    <label className="label">
                        Apellido
                        <input
                            type="text"
                            className="input w-100"
                            value={AUTH.register_last_name}
                            onChange={(e) => authChangeValue("register_last_name", e.target.value)}
                            required
                        />
                    </label>

                    <label className="label">
                        Correo
                        <input
                            type="email"
                            className="input w-100"
                            value={AUTH.register_email}
                            onChange={(e) => authChangeValue("register_email", e.target.value)}
                            required
                        />
                    </label>

                    <label className="label">
                        Contraseña
                        <input
                            type="password"
                            className="input w-100"
                            value={AUTH.register_password}
                            onChange={(e) => authChangeValue("register_password", e.target.value)}
                            required
                        />
                    </label>

                    <label className="label">
                        Contraseña
                        <input
                            type="password"
                            className="input w-100"
                            value={AUTH.register_re_password}
                            onChange={(e) => authChangeValue("register_re_password", e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" className="button w-100" disabled={AUTH.loading}>
                        {(!AUTH.loading) ? 'Registrar' : <i className="fas fa-circle-notch fa-spin" aria-hidden="true" />}
                    </button>

                </form>

            </div>
        )
    }

}

const styles = {
    logo: {
        width: '100px',
        margin: '0 auto',
        borderRadius: '50%',
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, actionCreators)(Register)