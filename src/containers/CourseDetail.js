import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'

import {

} from '../components'

class CourseDetail extends Component {

    render() {

        const {name} = this.props.match.params

        return (
            <MasterTemplate>

                <section className="container course-wrapper">
                    <div className="row">

                        <div className="col-md-12">

                            <h2>{name}</h2>

                            <Accordion>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3>Simple title</h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                        <p>Body content</p>
                                    </AccordionItemBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3>Complex title</h3>
                                        <div>With a bit of description</div>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                        <p>Body content</p>
                                    </AccordionItemBody>
                                </AccordionItem>
                            </Accordion>

                        </div>

                    </div>
                </section>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        router: state.routerReducer,
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps, actionCreators)(CourseDetail)