import React, { Component } from 'react'

class Footer extends Component {

    render() {

        return (
            <div>

                <footer className="footer-wrapper">

                    <div className="container section">

                        <div className="row">

                            <div className="col-sm-4 p-t-10px p-b-10px">

                                <img className="logo m-b-20px w-100" src="/images/ulpgc-course-white-1x.png" alt="logo" />
                                <p className="m-t-0px m-b-10px">Juan de Quesada, 30 35001 Las Palmas de Gran Canaria España</p>

                                <ul className="p-0">
                                    <li>
                                        <a href="tel:34928451000">
                                            <i className="fas fa-phone-volume"></i> (+34) 928 451 000
                                        </a>
                                    </li>
                                    <li>
                                        <a href="fax:+34928451022">
                                            <i className="fas fa-fax"></i> (+34) 928 451 022
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:universidad@ulpgc.es">
                                            <i className="fas fa-envelope"></i> universidad@ulpgc.es
                                        </a>
                                    </li>
                                </ul>

                                <div className="m-t-10px d-flex justify-content-between" style={styles.social}>

                                    <a href="https://www.facebook.com/universidadlaspalmas.ulpgc"><i className="fab fa-facebook-square "></i></a>
                                    <a href="https://twitter.com/ulpgc"><i className="fab fa-twitter-square "></i></a>
                                    <a href="https://www.youtube.com/user/ulpgc"><i className="fab fa-youtube "></i></a>
                                    <a href="https://www.linkedin.com/groups/148332"><i className="fab fa-linkedin "></i></a>
                                    <a href="https://www.flickr.com/photos/ulpgc"><i className="fab fa-flickr "></i></a>

                                </div>

                            </div>

                            <div className="col-sm-2 p-t-10px p-b-10px">
                                <h4 className="m-b-35px text-white">ULPGC</h4>
                                <a href="https://ulpgc.es/sobre-esta-web/aviso-legal" className="d-b">Aviso Legal</a>
                                <a href="https://ulpgc.es/sobre-esta-web/cookiess" className="d-b">Cookies</a>
                                <a href="https://ulpgc.es/sobre-esta-web/accesibilidad" className="d-b">Accesibilidad</a>
                                <a href="https://ulpgc.es/sobre-esta-web" className="d-b">Sobre la ULPGC</a>
                            </div>

                            <div className="col-sm-2 p-t-10px p-b-10px">
                                <h4 className="m-b-35px text-white">Enlaces</h4>
                                <a href="https://ulpgc.es/estudios" className="d-b">Estudios</a>
                                <a href="http://www.ulpgc.es/internacional_inicio" className="d-b">Internacional</a>
                                <a href="https://ulpgc.es/investigacion_inicio" className="d-b">Investigación</a>
                                <a href="https://ulpgc.es/servicios/intermedia" className="d-b">Servicios</a>
                            </div>

                            <div className="col-sm-12 col-md-4 p-t-10px p-b-10px">
                                <h4 className="m-b-35px text-white">Colaboradores</h4>

                                <div className="row">

                                    <div className="col-sm-6">
                                        <a href="http://pct.ulpgc.es">
                                            <span className="fpct" />
                                        </a>
                                    </div>

                                    <div className="col-sm-6">
                                        <a href="http://www.universia.es/index.htm">
                                            <span className="universia" />
                                        </a>
                                    </div>


                                </div>
                            </div>

                        </div>

                    </div>

                </footer>

                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col text-center text-white f-s-12px">
                                © Universidad de Las Palmas de Gran Canaria. ULPGC COURSE
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )

    }

}

const styles = {
    social: {
        maxWidth: '150px'
    }
}

export default Footer