import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

import {

} from '../components'

class Home extends Component {

    _handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {

        return (
            <MasterTemplate>

                <section className="search-wrapper">
                    <form className="w-100" onSubmit={this._handleSubmit}>

                        <p className="search-wrapper__title">Cambia tu futuro</p>
                        <p className="search-wrapper__subtitle">Aprende de todo con nuestros cursos más populares </p>

                        <div className="position-relative">
                            <input
                                className="input m-0 p-l-30px w-100 bg-white basic-shadow"
                                type="text"
                                placeholder="Busca tu curso"
                            />
                            <i className="fa fa-search input-icon" aria-hidden="true" />
                        </div>

                    </form>
                </section>


            </MasterTemplate>
        )

    }

}

export default Home