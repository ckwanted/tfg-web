import React, { Component } from 'react'

class About extends Component {

    render() {

        return (
            <section className="about-wrapper">

                <div className="container section">

                    <div className="row">

                        <div className="col-md-6 d-flex flex-cross-axis-center">
                            <img src="images/boy-university.jpg" alt="boy university" />
                        </div>

                        <div className="col-md-6 p-30px">

                            <h2>
                                Sobre
                                <span className="title-right"> ULPGC COURSE</span>
                            </h2>

                            <div className="separator" />

                            <p className="color-gray f-s-14px">En la actualidad, los cursos online suponen una de las herramientas más útiles tanto para aprender como para enseñar, su uso está extendido en todos los ámbitos, desde el profesional hasta el universitario o el ocio.</p>
                            <p className="color-gray f-s-14px">ULPGC COURSE es una plataforma de enseñanza online asociada a la universidad de las Palmas de Gran Canaria. Esta plataforma ofrece cursos online para aquellas personas que quieran adquirir nuevos conocimientos o mejorar los conocimientos existentes.</p>

                        </div>

                    </div>

                </div>

            </section>
        )

    }

}

export default About