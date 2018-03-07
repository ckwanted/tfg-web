import React, { Component } from 'react'

import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas'

import {
    Header,
    Navigation,
    Footer
} from '../components/index'

class MasterTemplate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isMenuOpened: false
        }
    }

    handleClick() {
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    }

    render() {

        return (
            <div>

                <OffCanvas width={300} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"left"}>
                    <OffCanvasBody className={{}}>

                        <div>
                            <Header />
                            <Navigation />
                        </div>
                        {this.props.children}
                        <Footer />

                    </OffCanvasBody>
                    <OffCanvasMenu className={{}}>
                        <p>Placeholder content.</p>
                        <ul>
                            <li>Link 1</li>
                            <li>Link 2</li>
                            <li>Link 3</li>
                            <li>Link 4</li>
                            <li>Link 5</li>
                            <li><a href="#" onClick={this.handleClick.bind(this)}>Toggle Menu</a></li>
                        </ul>
                    </OffCanvasMenu>
                </OffCanvas>

            </div>
        )

    }

}

export default MasterTemplate