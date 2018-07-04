import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import {Api} from '../commons'
import {Functions} from '../commons'
import Spinner from 'react-spinkit'

class Teacher extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            teachers: []
        }
    }

    componentWillMount() {
        new Api().getTeachers().then(({data}) => {
            const {teachers} = data
            this.setState({isLoading: false, teachers})
        })
        .catch(error => {
            this.setState({isLoading: false, teachers: []})
        })
    }

    _renderLoading = () => {
        return(
            <div className="col-md-12 d-flex justify-content-center">
                <Spinner name="folding-cube" color="#42648e"/>
            </div>
        )
    }

    _renderContent = () => {
        return this.state.teachers.map(teacher => {
            return(
                <div key={teacher.id} className="col-md-3">
                    {this._renderTeacher(teacher)}
                </div>
            )
        })
    }

    _renderTeacher = (teacher) => {
        const IMG = teacher.photo ? teacher.photo : "/images/teacher.jpg"
        return(
            <article>
                <div
                    className="card-course__img"
                    style={{
                        backgroundImage: `url(${IMG})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        display: 'block',
                        width: '100%',
                        height: '166px',
                        clear: 'both',
                    }}
                />
                <div className="p-20px">
                    <h4 className="m-b-5px f-s-18px" style={{color: '#333'}}>{teacher.name}</h4>
                    <p className="color-gray f-s-12px mb-1">{teacher.courses ? teacher.courses.length : 0} Curso</p>
                </div>
            </article>
        )
    }

    render() {

        return (
            <MasterTemplate>

                <section className="container course-wrapper" style={{minHeight: '70vh'}}>

                    <div className="row">

                        {this.state.isLoading ? this._renderLoading() : this._renderContent()}

                    </div>

                </section>

            </MasterTemplate>
        )

    }

}

export default Teacher