import React, { Component } from 'react'

import {
    Header,
    Navigation,
    Footer,
    Login,
    Register,
    Video,
    Quiz
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
            case Constant.VIDEO:
                return this._renderVideoModal()
            case Constant.QUIZ:
                return this._renderQuizModal()
            default:
                break
        }

    }

    _renderLoginModal = () => {
        return (
            <Modal
                open={true}
                showCloseIcon={true}
                onClose={() => this.props.closeModal()}
                center
                classNames={{ overlay: 'custom-overlay', modal: 'modal-wrapper' }}
            >
                <div className="modal-decorator">
                    <img className="logo" src="/images/ulpgc-course-white-1x.png" alt="logo" />
                </div>
                <Login />
            </Modal>
        )
    }

    _renderRegisterModal = () => {
        return (
            <Modal
                open={true}
                showCloseIcon={true}
                onClose={() => this.props.closeModal()}
                center
                classNames={{ overlay: 'custom-overlay', modal: 'modal-wrapper' }}
            >
                <div className="modal-decorator">
                    <img className="logo" src="/images/ulpgc-course-white-1x.png" alt="logo" />
                </div>
                <Register />
            </Modal>
        )
    }

    _renderVideoModal = () => {
        return (
            <Modal
                open={true}
                showCloseIcon={true}
                onClose={() => this.props.closeModal()}
                center
                classNames={{ overlay: 'custom-overlay', modal: 'modal-wrapper--video' }}
            >
                <Video />
            </Modal>
        )
    }

    _renderQuizModal = () => {
        return (
            <Modal
                open={true}
                showCloseIcon={true}
                onClose={() => this.props.closeModal()}
                center
                classNames={{ overlay: 'custom-overlay', modal: 'modal-wrapper' }}
            >
                <Quiz />
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

export default connect(mapStateToProps, actionCreators)(MasterTemplate)