import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import Spinner from 'react-spinkit'


import {

} from '../components'

class CourseDetail extends Component {

    render() {

        return (
            <MasterTemplate>

                <section className="container course-wrapper">
                    <div className="row">

                        <div className="col-md-12">

                            asas

                        </div>

                    </div>
                </section>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps, actionCreators)(CourseDetail)