import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import {connect} from 'react-redux'
import * as actionCreators from '../actions'

class SendResetPassword extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        this.props.dispatch(actionCreators.sendPasswordEmail(this.state.email))
    }

    render() {

        return (
            <MasterTemplate>

                <section style={{height: '50vh'}}>

                    <form
                        className="container d-flex align-items-center h-100"
                        method="POST"
                        onSubmit={this._handleSubmit}
                    >
                        <input
                            className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                            type="email"
                            placeholder="Email ..."
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            required
                        />
                        <button type="submit" className="button">
                            restablecer
                        </button>
                    </form>

                </section>

            </MasterTemplate>
        )

    }

}

export default connect()(SendResetPassword)