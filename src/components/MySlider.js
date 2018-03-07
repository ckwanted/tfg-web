import React, { Component } from 'react'

import OwlCarousel from 'react-owl-carousel'

import { Constant } from '../commons'

class MySlider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            type: this.props.type || Constant.SLIDER.IMAGE,
            loop: this.props.loop || true,
            margin: this.props.margin || 0,
            dots: this.props.dots || false,
            autoplay: this.props.autoplay || true,
            nav: this.props.nav || false,
            navText: this.props.navText || ['<', '>'],
            items: this.props.items || 1,
            data: this.props.data
        }

    }

    _renderItems = () => {
        const DATA = this.state.data
        let div = []

        for(let i = 0; i < DATA.length; i++) {

            switch(this.state.type) {

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
                        <div key={i} className="item">
                            <img key={i} src={`${ITEM.image}`} alt={`slide ${i + 1}`} />
                            <div className="p-20px">
                                <h4 className="m-b-5px f-s-18px">{ITEM.title.toUpperCase()}</h4>
                            </div>
                        </div>
                    )
                    break

            }

        }

        return div
    }

    render() {

        return (
            <section className="slider-wrapper">

                <OwlCarousel
                    className="owl-theme"
                    loop={this.state.loop}
                    margin={this.state.margin}
                    dots={this.state.dots}
                    autoplay={this.state.autoplay}
                    nav={this.state.nav}
                    navText={this.state.navText}
                    items={this.state.items}
                >

                    {this._renderItems()}
                </OwlCarousel>

            </section>
        )

    }

}

export default MySlider