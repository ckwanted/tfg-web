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

                            <p className="color-gray f-s-14px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem maiores eaque similique non distinctio voluptates perspiciatis omnis, repellendus ipsa aperiam, laudantium voluptatum nulla?.</p>
                            <p className="color-gray f-s-14px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem maiores eaque similique non distinctio voluptates perspiciatis omnis, repellendus ipsa aperiam, laudantium voluptatum nulla?.</p>
                            <p className="color-gray f-s-14px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem maiores eaque similique non distinctio voluptates perspiciatis omnis, repellendus ipsa aperiam, laudantium voluptatum nulla?.</p>

                        </div>

                    </div>

                </div>

            </section>
        )

    }

}

export default About