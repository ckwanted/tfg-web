import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

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