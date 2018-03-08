import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Header extends Component {

    render() {

        return (
            <header className="header">

                <div className="container">
                    <div className="row">

                        <div className="col-md-6">
                            <div className="widget">

                                <ul className="p-0 header-contact">
                                    <li>
                                        <a href="tel:34928451000" className="text-white">
                                            <i className="fa fa-phone text-white"></i> (+34) 928 451 000
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:universidad@ulpgc.es" className="text-white">
                                            <i className="fa fa-envelope-o text-white"></i> universidad@ulpgc.es
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="widget–auth">

                                <ul className="p-0 m-0 header-auth">

                                    <li className="p-l-5px p-r-5px">
                                        <Link to="#" className="text-white">
                                            <i className="fa fa-user-o text-white"></i> Login
                                        </Link>
                                    </li>

                                    <li className="p-l-5px p-r-5px">
                                        /
                                    </li>

                                    <li className="p-l-5px p-r-5px">
                                        <Link to="#" className="text-white">
                                            <i className="fa fa-edit text-white"></i> Register
                                        </Link>
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </header>
        )

    }

}

export default Header