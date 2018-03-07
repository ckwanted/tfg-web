import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {
    MySlider,
    Feature,
    About,
    PopularCourse
} from '../components'

class Home extends Component {

    render() {

        return (
            <MasterTemplate>

                <MySlider
                    loop={true}
                    data={[
                        'images/slider/slider1.jpg',
                        'images/slider/slider2.jpg',
                        'images/slider/slider3.jpg',
                        'images/slider/slider4.jpg'
                    ]}
                />
                <Feature />
                <About />
                <PopularCourse />

            </MasterTemplate>
        )

    }

}

export default Home