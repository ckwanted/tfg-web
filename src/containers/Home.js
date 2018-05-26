import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import { push } from 'react-router-redux'

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            q: ''
        }
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        this.props.dispatch(actionCreators.searchCourse(this.state.q))
    }

    render() {

        return (
            <MasterTemplate>

                <section className="search-wrapper">
                    <form className="w-100" onSubmit={this._handleSubmit}>

                        <p className="search-wrapper__title">Cambia tu futuro</p>
                        <p className="search-wrapper__subtitle">Aprende de todo con nuestros cursos más populares </p>

                        <div>

                            <div className="position-relative">
                                <input
                                    className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                                    type="text"
                                    placeholder="Busca tu curso"
                                    value={this.state.q}
                                    onChange={(e) => this.setState({q: e.target.value})}
                                />
                                <i className="fa fa-search input-icon" aria-hidden="true" />
                            </div>

                        </div>

                    </form>
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

export default connect(mapStateToProps)(Home)