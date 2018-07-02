import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import GoogleMapReact from 'google-map-react'

import {
    Feature,
    About,
} from '../components'

class AboutUs extends Component {

    static defaultProps = {
        center: {
            lat: 28.0726871,
            lng: -15.4519391
        },
        zoom: 18
    }

    render() {

        const LOGO = () => (
            <div
                style={{
                    display: 'inline-flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '100%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <img className="logo" src="/images/ulpgc-course-1x.png" alt="logo" style={{width: '200px'}} />
            </div>
        )

        return (
            <MasterTemplate>

                <About />
                <Feature />

                <div style={{ height: '70vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <LOGO
                            lat={28.0733156}
                            lng={-15.4516689}
                        />
                    </GoogleMapReact>
                </div>


            </MasterTemplate>
        )

    }

}

export default AboutUs