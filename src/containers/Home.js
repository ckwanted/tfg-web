import React, { Component } from 'react'

import {
    MasterTemplate,
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