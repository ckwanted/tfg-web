import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import OwlCarousel from 'react-owl-carousel'
import ReactStars from 'react-stars'

import { Constant } from '../commons'

class MySlider extends Component {

    _renderItems = () => {
        const TYPE = this.props.type || Constant.SLIDER.IMAGE
        const DATA = this.props.data
        let div = []

        for(let i = 0; i < DATA.length; i++) {

            switch(TYPE) {

                case Constant.SLIDER.IMAGE:
                    div.push(
                        <div key={i} className="item">
                            <img key={i} src={`${DATA[i]}`} alt={`slide ${i + 1}`} />
                        </div>
                    )
                    break
                case Constant.SLIDER.COURSE:

                    const ITEM = DATA[i]

                    div.push(
                        <Link key={i} to="/">
                            <div className="item bg-white position-r" style={{border: '1px solid #eee'}}>
                                <img key={i} src={`${ITEM.image}`} alt={`slide ${i + 1}`} />
                                <div className="p-20px">
                                    <h4 className="m-b-5px f-s-18px" style={styles.a}>{ITEM.title.toUpperCase()}</h4>
                                    <div className="price-tag" style={styles.a}>
                                        {ITEM.price === 0 ? 'Gratis' : `${ITEM.price} €`}
                                    </div>
                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        value={4.5}
                                        size={14}
                                        color2={'#ffd700'}
                                    />
                                    <p className="color-gray f-s-14px m-t-20px">{ITEM.description}</p>
                                </div>
                            </div>
                        </Link>
                    )
                    break
                default:
                    break;

            }

        }

        return div
    }

    render() {

        return (
            <section className="slider-wrapper">

                <OwlCarousel
                    className="owl-theme"
                    loop={this.props.loop || false}
                    margin={this.props.margin || 0}
                    dots={this.props.dots || false}
                    autoplay={this.props.autoplay || true}
                    nav={this.props.nav || false}
                    navText={this.props.navText || ['<', '>']}
                    items={this.props.items || 1}
                >

                    {this._renderItems()}
                </OwlCarousel>

            </section>
        )

    }

}

const styles = {
    a: {
      color: '#333'
    }
}

export default MySlider