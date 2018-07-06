import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import CloseIcon from '@material-ui/icons/Close'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import StripeCheckout from 'react-stripe-checkout'

class Cart extends Component {

    componentWillMount() {
        this._checkCart()
    }

    componentWillReceiveProps() {
        this._checkCart()
    }

    componentDidUpdate() {
        this._checkCart()
    }

    _checkCart = () => {
        const COURSES = this.props.cart.courses
        const {userPayments} = this.props.courses

        if(userPayments !== undefined && userPayments.length) {
            userPayments.map(course_id => {
                Object.keys(COURSES).forEach((key) => {
                    if(key == course_id) this.props.dispatch(actionCreators.removeFromTheCart(key))
                })
            })
        }

    }

    _renderCart = () => {
        const COURSES = this.props.cart.courses
        let array = []

        Object.keys(COURSES).forEach(function(key) {
            array.push(COURSES[key])
        })

        if(array.length === 0) {
            return(
                <div style={{height: '300px'}}>
                    <p>El carrito esta vacío</p>
                </div>
            )
        }

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
                            style={{cursor: 'pointer', color: 'white'}}
                            onClick={(e) => this.props.dispatch(actionCreators.removeFromTheCart(course.id))}
                        />
                    </div>
                </div>
            )
        })

    }

    _getPrice = () => {
        const COURSES = this.props.cart.courses
        let array = []
        let getPrice = 0

        Object.keys(COURSES).forEach(function(key) {
            array.push(COURSES[key])
        })

        array.map(course => {
            getPrice += Number(course.price)
            return getPrice
        })

        return getPrice * 100
    }

    _renderPayment = () => {
        const COURSES = this.props.cart.courses
        const AUTH = this.props.auth

        if(AUTH.access_token) {

            const AMOUNT = this._getPrice()
            const CART_LENGTH = Object.keys(COURSES).length

            if(CART_LENGTH && CART_LENGTH > 0) {

                return(
                    <div className="ml-auto">

                        <StripeCheckout
                            name="ULPGC COURSE"
                            description="Los mejores cursos online"
                            email="universidad@ulpgccourse.es"
                            image="https://ulpgc-course.herokuapp.com/images/ulpgc-course-1x.png"
                            amount={AMOUNT}
                            currency="EUR"
                            token={this.onToken}
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        >
                            <button className="button button--rounded button--small f-s-12px">
                                Realizar pago
                            </button>
                        </StripeCheckout>

                    </div>
                )

            }

        }
    }

    onToken = (cart) => {
        this.props.dispatch(actionCreators.payCart(cart))
    }

    render() {
        return (
            <MasterTemplate>

                <section className="container section">
                    <div className="row">

                        <div className="col-md-12">

                            <hr/>
                            <div className="d-flex">
                                <h3>Mi carrito</h3>
                                {this._renderPayment()}
                            </div>
                            <hr/>

                            <div style={{minHeight: '300px'}}>
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
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps)(Cart)