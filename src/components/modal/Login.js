import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

class Login extends Component {

    _handleSubmit = (e) =>  {
        e.preventDefault()

        this.props.dispatch(actionCreators.authLogin())
    }

    render() {

        const {dispatch} = this.props
        const AUTH = this.props.auth

        return (
            <div className="modal-content">

                <img
                    className="d-block"
                    src="/images/graduate.png"
                    alt="logo"
                    style={styles.logo}
                />

                <form onSubmit={this._handleSubmit}>

                    <label className="label">
                        Correo
                        <input
                            type="email"
                            className="input w-100"
                            value={AUTH.email}
                            onChange={(e) => dispatch(actionCreators.authChangeValue("email", e.target.value))}
                            required
                        />
                    </label>

                    <label className="label">
                        Contraseña
                        <input
                            type="password"
                            className="input w-100"
                            value={AUTH.password}
                            onChange={(e) => dispatch(actionCreators.authChangeValue("password", e.target.value))}
                            required
                        />
                    </label>

                    <button type="submit" className="button w-100" disabled={AUTH.loading}>
                        {(!AUTH.loading) ? 'Iniciar sesión' : <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" />}
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

export default connect(mapStateToProps)(Login)