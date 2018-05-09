import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

class Cart extends Component {

    _renderCart = () => {
        const COURSES = this.props.cart.courses
        let array = []

        Object.keys(COURSES).forEach(function(key) {
            array.push(COURSES[key])
        })

        return array.map(course => {
            return(
                <div key={course.id} className="d-flex align-items-center">
                    <div>
                        <p className="f-s-12px color-gray m-0">{course.user.name}</p>
                        <p className="f-s-16px">{course.name}</p>
                    </div>
                    <div className="ml-auto d-flex align-items-center">
                        <p className="f-s-20px m-0">{course.price}€</p>
                        <CloseIcon
                            className="ml-3 bg-blue-light border-radius-50"
                            color="#fff"
                            style={{cursor: 'pointer'}}
                            onClick={(e) => this.props.dispatch(actionCreators.removeFromTheCart(course.id))}
                        />
                    </div>
                </div>
            )
        })

    }

    render() {

        const AUTH = this.props.auth

        return (
            <MasterTemplate>

                <section className="container section">
                    <div className="row">

                        <div className="col-md-12">

                            <hr/>
                            <div className="d-flex">
                                <h3>Mi carrito</h3>
                                {AUTH.access_token ?
                                    <button className="button button--rounded button--small f-s-12px ml-auto">
                                        Finalizar pago
                                    </button>
                                    : null
                                }
                            </div>
                            <hr/>

                            <div>
                                {this._renderCart()}
                            </div>

                        </div>

                    </div>
                </section>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        cart: state.cartReducer,
    }
}

export default connect(mapStateToProps)(Cart)