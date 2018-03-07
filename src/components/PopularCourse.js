import React, { Component } from 'react'

import { Constant } from '../commons'

import { MySlider } from './index'

class PopularCourse extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items: 3
        }

    }

    render() {

        return (
            <section className="popular-course-wrapper">

                <div className="container section">

                    <div className="row">

                        <div className="col-md-12">

                            <div className="popular-course-body">

                                <h2 className="separator">
                                    Cursos
                                    <span className="title-right" > Populares</span>
                                </h2>

                                <p className="color-gray f-s-14px">Escoga su curso preferido</p>

                                <div className="separator" />

                            </div>


                            <div className="m-t-50px">

                                <MySlider
                                    type={Constant.SLIDER.COURSE}
                                    margin={10}
                                    items={this.state.items}
                                    dots={true}
                                    data={[
                                        {title: 'lorem 1', image: 'images/slider/slider1.jpg'},
                                        {title: 'lorem 2', image: 'images/slider/slider2.jpg'},
                                        {title: 'lorem 3', image: 'images/slider/slider3.jpg'},
                                        {title: 'lorem 4', image: 'images/slider/slider4.jpg'},
                                    ]}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        )

    }

}

export default PopularCourse