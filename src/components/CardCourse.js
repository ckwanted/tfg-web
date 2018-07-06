import React, {Component} from 'react'
import ReactStars from 'react-stars'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import {Functions, Constant} from '../commons'

class CardCourse extends Component {

    _isPay = (ITEM) => {

        const userId = this.props.auth.user ? this.props.auth.user.id : null
        const rol = this.props.auth.rol

        // Own of this course
        if(ITEM.id === userId || rol === Constant.ADMIN) return true

        const {userPayments} = this.props.courses

        for(let i = 0; i < userPayments.length; i++) {
            if(userPayments[i] === ITEM.id) return true
        }

        return false
    }

    _renderStatus = (ITEM) => {
        const CART = this.props.cart

        if(this._isPay(ITEM)) return null;
        let data

        if(CART.courses[ITEM.id] === undefined) {
            data =  <i className="cart p-20px fas fa-cart-arrow-down" onClick={(e) => this.props.dispatch(actionCreators.addToCart(ITEM.id, ITEM))}/>
        }
        else {
            data = <span className="p-20px d-inline-block color-blue-dark f-s-12px">en el carrito</span>
        }

        const SHOW_CART = (this.props.showCart !== undefined) ? this.props.showCart : true

        if(!SHOW_CART) return null

        return(
            <div className="text-right">
                {data}
            </div>
        )
    }

    render() {
        const ITEM = this.props.item
        const COURSE_NAME = ITEM.name
        const SLUG = ITEM.slug
        const AUTHOR = (ITEM.user) ? `${ITEM.user.name} ${ITEM.user.last_name}` : ''
        const PHOTO = ITEM.photo
        const STARS = Number(ITEM.star)

        let isPay = this.props.isPay || this._isPay(ITEM)

        let isStar = (this.props.isStar !== undefined) ? this.props.isStar : true

        return (
            <div className="card-course bg-white position-r mb-2" style={{border: '1px solid #eee'}}>

                <Link to={(isPay) ? `/courses/${SLUG}` : '#'} className="d-block">

                    <div className="card-course__img" style={{
                            backgroundImage: `url("${PHOTO}")`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            display: 'block',
                            width: '100%',
                            height: '166px',
                            clear: 'both',
                        }}
                    />

                    <div className="p-20px">

                        <h4 className="m-b-5px f-s-18px" style={styles.a}>{COURSE_NAME.toUpperCase()}</h4>
                        <p className="color-gray f-s-12px mb-1">{AUTHOR}</p>

                        <div className="price-tag" style={styles.a}>
                            {ITEM.price === 0 ? 'Gratis' : `${ITEM.price} €`}
                        </div>

                        {isStar ?
                            <ReactStars
                                edit={false}
                                count={5}
                                value={STARS}
                                size={14}
                                color2={'#ffd700'}
                            />
                            : null
                        }

                        <p className="color-gray f-s-14px m-t-20px">{Functions.shortText(ITEM.description)}</p>
                    </div>
                </Link>

                {this._renderStatus(ITEM)}

            </div>
        )
    }
}

const styles = {
    a: {
        color: '#333'
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer,
        courses: state.courseReducer,
        auth: state.authReducer,
    }
}

export default connect(mapStateToProps)(CardCourse)