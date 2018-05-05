import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'
import {Constant} from '../commons'

import iziToast from 'izitoast'

class Header extends Component {

    _renderMyProfile = () => {
        const {dispatch} = this.props
        const AUTH = this.props.auth

        if(AUTH.access_token) {
            return (
                <Link to="#" className="text-white" onClick={() => alert("Mi perfil")}>
                    Mi perfil
                </Link>
            )
        }

        return (
            <Link to="#" className="text-white" onClick={() => dispatch(actionCreators.openModal(Constant.LOGIN))}>
                Login
            </Link>
        )
    }

    _renderLogout = () => {
        const {dispatch} = this.props
        const AUTH = this.props.auth

        if(AUTH.access_token) {
            return (
                <Link to="#" className="text-white" onClick={() => this._showConfirm(dispatch)}>
                    Log out
                </Link>
            )
        }

        return (
            <Link to="#" className="text-white" onClick={() => dispatch(actionCreators.openModal(Constant.REGISTER))}>
                Register
            </Link>
        )
    }

    _showConfirm = (dispatch) => {
        iziToast.question({
            timeout: 10000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: 'question',
            zindex: 999,
            title: '',
            message: '¿Estas seguro de que deseas cerrar sessión?',
            position: 'center',
            buttons: [
                ['<button><b>Si</b></button>', function (instance, toast) {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                    dispatch(actionCreators.logOut())
                }, true],
                ['<button>No</button>', function (instance, toast) {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                }],
            ],
            onClosing: function(instance, toast, closedBy){

            },
            onClosed: function(instance, toast, closedBy){

            }
        })
    }

    render() {

        return (
            <header className="header">

                <div className="container">
                    <div className="row">

                        <div className="col-md-6">
                            <div className="widget">

                                <ul className="p-0 header-contact">
                                    <li>
                                        <a href="tel:34928451000" className="text-white">
                                            <i className="fas fa-phone-volume text-white" /> (+34) 928 451 000
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:universidad@ulpgc.es" className="text-white">
                                            <i className="fas fa-envelope text-white" /> universidad@ulpgc.es
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="widget–auth">

                                <ul className="p-0 m-0 header-auth">

                                    <li className="p-l-5px p-r-5px">
                                        {this._renderMyProfile()}
                                    </li>

                                    <li className="p-l-5px p-r-5px">
                                        /
                                    </li>

                                    <li className="p-l-5px p-r-5px">
                                        {this._renderLogout()}
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </header>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps)(Header)
