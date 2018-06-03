import React, { Component } from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Typography from '@material-ui/core/Typography'

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
                    <Typography className="mb-2" variant="title">{section.title}</Typography>
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {RESOURCES.map(resource => {

                        const TYPE = (resource.uri) ? 'Video' : 'Questionario'

                        return (
                            <TableRow key={resource.id}>
                                <TableCell component="th" scope="row">{resource.title}</TableCell>
                                <TableCell>{TYPE}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
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

