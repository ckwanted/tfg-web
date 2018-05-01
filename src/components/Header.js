import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'
import {Constant} from '../commons'

class Header extends Component {

    render() {

        const {dispatch} = this.props

        return (
            <header className="header">

                <div className="container">
                    <div className="row">

                        <div className="col-md-6">
                            <div className="widget">

                                <ul className="p-0 header-contact">
                                    <li>
                                        <a href="tel:34928451000" className="text-white">
                                            <i className="fa fa-phone text-white" /> (+34) 928 451 000
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:universidad@ulpgc.es" className="text-white">
                                            <i className="fa fa-envelope-o text-white" /> universidad@ulpgc.es
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="widget–auth">

                                <ul className="p-0 m-0 header-auth">

                                    <li className="p-l-5px p-r-5px">
                                        <Link to="#" className="text-white" onClick={() => dispatch(actionCreators.openModal(Constant.LOGIN))}>
                                            <i className="fa fa-user-o text-white" /> Login
                                        </Link>
                                    </li>

                                    <li className="p-l-5px p-r-5px">
                                        /
                                    </li>

                                    <li className="p-l-5px p-r-5px">
                                        <Link to="#" className="text-white" onClick={() => dispatch(actionCreators.openModal(Constant.REGISTER))}>
                                            <i className="fa fa-edit text-white" /> Register
                                        </Link>
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
};

export default connect(mapStateToProps)(Header)
