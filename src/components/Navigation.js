import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Navigation extends Component {

    render() {

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
                                <Link to="/" className="active">Inicio</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/">Cursos</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/">Eventos</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/">Profesores</Link>
                            </li>
                            <li>
                                <Link to="/">Libros</Link>
                            </li>
                        </ul>
                    </nav>

                </div>

            </section>
        )

    }

}

export default Navigation