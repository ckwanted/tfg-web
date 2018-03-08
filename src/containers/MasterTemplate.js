import React, { Component } from 'react'

import {
    Header,
    Navigation,
    Footer
} from '../components/index'

class MasterTemplate extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>

                <div className="sticky-header">
                    <Header />
                    <Navigation />
                </div>
                <div className="sticky-header-margin">
                    {this.props.children}
                    <Footer />
                </div>

            </div>
        )

    }

}

export default MasterTemplate