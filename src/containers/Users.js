import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'
import Spinner from 'react-spinkit'
import {Constant} from '../commons'
import {connect} from 'react-redux'
import * as actionCreators from '../actions'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import EditIcon from '@material-ui/icons/Edit'

class Users extends Component {

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchUser())
    }

    _renderContent = () => {
        const USER = this.props.user

        if(USER.loading) {
            return(
                <div className="row justify-content-center">
                    <Spinner className="mt-5" name="folding-cube" color="#42648e"/>
                </div>
            )
        }

        return(
            <div className="py-5">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell className="d-none d-md-table-cell">Apellido</TableCell>
                                <TableCell className="d-none d-lg-table-cell">Email</TableCell>
                                <TableCell className="d-none d-lg-table-cell">Rol</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this._tableBody(USER)}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )

    }

    _tableBody = (USER) => {
        if(USER.users.data) {
            return USER.users.data.map(user => {
                return(
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="d-none d-md-table-cell">{user.last_name}</TableCell>
                        <TableCell className="d-none d-lg-table-cell">{user.email}</TableCell>
                        <TableCell className="d-none d-lg-table-cell">{user.rol}</TableCell>
                        <TableCell>
                            <EditIcon
                                className="cursor-pointer"
                                style={{ fontSize: 14 }}
                            />
                        </TableCell>
                    </TableRow>
                )
            })
        }
    }

    render() {

        return (
            <MasterTemplate>

                <div className="container-fluid pt-3" style={{ minHeight: '70vh', width: '100%' }}>
                    {this._renderContent()}
                </div>

            </MasterTemplate>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
}

export default connect(mapStateToProps)(Users)