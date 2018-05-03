import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Navigation extends Component {

    render() {
        const {location} = this.props.router

        return (
            <section className="nav-wrapper">

                <div className="container d-flex">

                    <div className="m-r-auto">
                        <Link to="/">
                            <img className="logo" src="/images/ulpgc-course-1x.png" alt="logo" />
                        </Link>
                    </div>

                    <nav className="nav d-flex">
                        <i className="fa fa-bars" />
                        <ul className="p-0px m-0px">
                            <li className="p-l-10px p-r-10px">
                                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/courses" className={location.pathname === '/courses' ? 'active' : ''}>Cursos</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/" className={location.pathname === '/teachers' ? 'active' : ''}>Profesores</Link>
                            </li>
                            <li>
                                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Sobre Nosotros</Link>
                            </li>
                        </ul>
                    </nav>

                </div>

            </section>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        router: state.routerReducer
    }
}

export default connect(mapStateToProps)(Navigation)