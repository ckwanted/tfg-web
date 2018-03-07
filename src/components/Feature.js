import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Feature extends Component {

    render() {

        return (
            <section className="feature-wrapper">

                <div className="container section">

                    <div className="row">

                        <div className="col-md-4 feature">

                            <div className="feature-icon">
                                <img src="images/online.png" alt="online" style={styles.featureLeft} />
                            </div>
                            <div className="feature-title" style={styles.featureLeft}>
                                <h3>Cursos</h3>
                                <h3>Online</h3>
                                <Link to="#" className="read-more color-blue-dark f-s-16px">ver mas</Link>
                            </div>

                        </div>

                        <div className="col-md-4 feature">

                            <div className="feature-icon">
                                <img src="images/book.png" alt="book"/>
                            </div>
                            <div className="feature-title">
                                <h3>Libros</h3>
                                <h3>Modernos</h3>
                                <Link to="#" className="read-more color-blue-dark f-s-16px">ver mas</Link>
                            </div>

                        </div>

                        <div className="col-md-4 feature">

                            <div className="feature-icon">
                                <img src="images/graduate.png" alt="graduate"/>
                            </div>
                            <div className="feature-title">
                                <h3>Profesores</h3>
                                <h3>Cualificados</h3>
                                <Link to="#" className="read-more color-blue-dark f-s-16px">ver mas</Link>
                            </div>

                        </div>

                    </div>

                </div>

            </section>
        )

    }

}

const styles = {
    featureLeft: {
        position: 'relative',
        left: '-20px'
    }
}

export default Feature