import React from 'react'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'

const CardCourse = (props) => {

    const ITEM = props.item

    return(
        <div className="card-course bg-white position-r mb-2" style={{border: '1px solid #eee'}}>

            <Link to={`courses/${ITEM.name}`} className="d-block">
                <img className="card-course__img" src={`${ITEM.photo}`} alt={ITEM.name} />

                <div className="p-20px">

                    <h4 className="m-b-5px f-s-18px" style={styles.a}>{ITEM.name.toUpperCase()}</h4>

                    <div className="price-tag" style={styles.a}>
                        {ITEM.price === 0 ? 'Gratis' : `${ITEM.price} €`}
                    </div>

                    <ReactStars
                        edit={false}
                        count={5}
                        value={Number(ITEM.star)}
                        size={14}
                        color2={'#ffd700'}
                    />

                    <p className="color-gray f-s-14px m-t-20px">{ITEM.description}</p>
                </div>
            </Link>

            <div className="text-right">
                <i className="cart p-20px fas fa-cart-arrow-down" onClick={(e) => alert("click")} />
                {/*<span className="p-20px d-inline-block color-blue-dark f-s-12px">comprado</span>*/}
            </div>

        </div>
    )
}

const styles = {
    a: {
        color: '#333'
    }
}

export default CardCourse