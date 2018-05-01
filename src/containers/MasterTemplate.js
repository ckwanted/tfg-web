import React, { Component } from 'react'

import {
    Header,
    Navigation,
    Footer,
} from '../components/index'

import Modal from 'react-responsive-modal'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'
import {Constant} from '../commons'

class MasterTemplate extends Component {

    _renderModal = () => {
        const MODAL = this.props.auth.modal

        switch(MODAL) {
            case Constant.LOGIN:
                return this._renderLoginModal()
            case Constant.REGISTER:
                return this._renderRegisterModal()
            default:
                break
        }

    }

    _renderLoginModal = () => {
        return (
            <Modal open={true}  onClose={() => this.props.dispatch(actionCreators.closeModal())} center>
                <div className="pt-5">
                    <h2>Login</h2>
                </div>
            </Modal>
        )
    }

    _renderRegisterModal = () => {
        return (
            <Modal open={true}  onClose={() => this.props.dispatch(actionCreators.closeModal())} center>
                <div className="pt-5">
                    <h2>Register</h2>
                </div>
            </Modal>
        )
    }

    render() {

        return (
            <div>

                {this._renderModal()}

                <div className="sticky-header">
                    <Header />
                    <Navigation />
                </div>
                <div className="sticky-header-margin">
                    {this.props.children}
                    <Footer />
                </div>

            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
};

export default connect(mapStateToProps)(MasterTemplate)