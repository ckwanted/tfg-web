import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import NewResource from './NewResource'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import CreateIcon from '@material-ui/icons/Add'
import {courseChangeValue} from "../../actions/courseAction";
import Constant from "../../commons/Constant";

class TableContent extends Component {

    constructor(props) {
        super(props)
    }

    _renderSection = (COURSE) => {

        const SECTIONS = COURSE.sections

        if(SECTIONS === undefined || SECTIONS.length === 0) return <div />

        let items = SECTIONS.map(section => {
            return (
                <article key={section.id} className="mt-4">
                    <div className="d-flex">
                        <Typography className="mb-2" variant="title">{section.title}</Typography>
                        <EditIcon
                            className="position-relative ml-1 cursor-pointer"
                            style={{ fontSize: 14, top: '5px' }}
                            onClick={() => {
                                this.props.dispatch(actionCreators.courseChangeValue("id", section.id, 'sectionSelected'))
                                this.props.dispatch(actionCreators.courseChangeValue("title", section.title, 'sectionSelected'))
                                this.props.dispatch(actionCreators.courseChangeValue("resourcesLength", section.resources.length, 'sectionSelected'))
                                this.props.dispatch(actionCreators.courseChangeValue("dialogEditSection", true))
                            }}
                        />
                    </div>
                    <Paper>
                        {this._renderTable(section)}
                    </Paper>
                </article>
            )
        })

        return(
            <section>
                {items}
            </section>
        )
    }

    _renderTable = (section) => {

        const RESOURCES = section.resources

        return(
            <div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell className="p-0px">
                                <CreateIcon
                                    className="position-relative cursor-pointer"
                                    style={{ fontSize: 14 }}
                                    onClick={() => {
                                        this.props.dispatch(courseChangeValue("section_id", section.id, "resourceSelected"))
                                        this.props.dispatch(courseChangeValue("dialogNewResource", true))
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RESOURCES.map(resource => {

                            const TYPE = (resource.uri) ? 'Video' : 'Questionario'

                            return (
                                <TableRow key={resource.id}>
                                    <TableCell component="th" scope="row">{resource.title}</TableCell>
                                    <TableCell>{TYPE}</TableCell>
                                    <TableCell className="p-0px">
                                        <EditIcon
                                            className="position-relative cursor-pointer"
                                            style={{ fontSize: 14 }}
                                            onClick={() => {
                                                this.props.dispatch(courseChangeValue("title", resource.title, "resourceSelected"))
                                                this.props.dispatch(courseChangeValue("id", resource.id, "resourceSelected"))
                                                this.props.dispatch(courseChangeValue("section_id", resource.section_id, "resourceSelected"))
                                                this.props.dispatch(courseChangeValue("quiz", resource.quiz, "resourceSelected"))
                                                this.props.dispatch(courseChangeValue("uri", resource.uri, "resourceSelected"))
                                                if(resource.uri) this.props.dispatch(courseChangeValue("type", "uri", "resourceSelected"))
                                                else this.props.dispatch(courseChangeValue("type", "quiz", "resourceSelected"))
                                                this.props.dispatch(courseChangeValue("dialogEditResource", true))
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <NewResource />

            </div>
        )
    }

    render() {

        const COURSE = this.props.courses.course

        return(
            <div className="mt-4">

                {this._renderSection(COURSE)}

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer,
    }
}

export default connect(mapStateToProps)(TableContent)

