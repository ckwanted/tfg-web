import React, {Component} from 'react'
import ReactStars from 'react-stars'

const CardCourse = (props) => {

    const ITEM = props.item

    return(
        <div className="item bg-white position-r mb-2" style={{border: '1px solid #eee'}}>
            <img src={`${ITEM.image}`} alt={ITEM.name} />
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
        </div>
    )
}

const styles = {
    a: {
        color: '#333'
    }
}

export default CardCourse