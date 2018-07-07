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
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

import {EditUser} from '../components'

class Users extends Component {

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchUser())
    }

    _handleOnChange = (e) => {
        this.props.dispatch(actionCreators.userChangeValue("q", e.target.value))
    }

    _handleSubmit = (e) => {
        e.preventDefault()
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
            <div className="pb-5">

                <div className="my-5">
                    <form className="d-flex" onSubmit={this._handleSubmit}>
                        <TextField
                            className="w-100"
                            label="Buscar Usuario por nombre, apellido o email"
                            value={USER.q}
                            onChange={this._handleOnChange}
                        />
                        <button type="submit" className="button">buscar</button>
                    </form>
                </div>

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

                {this._renderMore(USER)}

                <EditUser />

            </div>
        )

    }

    _tableBody = (USER) => {
        if(USER.users.data) {
            return USER.users.data.map(user => {
                if(user.id !== 1) {

                    let rol = ''

                    switch(user.rol) {
                        case Constant.ADMIN:
                            rol = 'Administrador'
                            break
                        case Constant.TEACHER:
                            rol = 'Profesor'
                            break
                        case Constant.STUDENT:
                            rol = 'Alumno'
                            break
                    }

                    return(
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell className="d-none d-md-table-cell">{user.last_name}</TableCell>
                            <TableCell className="d-none d-lg-table-cell">{user.email}</TableCell>
                            <TableCell className="d-none d-lg-table-cell">{rol}</TableCell>
                            <TableCell>
                                <EditIcon
                                    className="cursor-pointer"
                                    style={{ fontSize: 14 }}
                                    onClick={(e) => {
                                        this.props.dispatch(actionCreators.userChangeValue("userSelected", user))
                                        this.props.dispatch(actionCreators.userChangeValue("modal", true))
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    )
                }
            })
        }
    }

    _renderMore = (USER) => {
        const {current_page, last_page} = USER.users

        if(USER.loadingNextPage) {
            return (
                <div className="mt-3 d-flex justify-content-center">
                    <Spinner name="folding-cube" color="#42648e"/>
                </div>
            )
        }

        if(current_page < last_page) {
            return(
                <div className="mt-3 text-center">
                    <Button
                        variant="fab"
                        mini
                        color="secondary"
                        aria-label="add"
                        onClick={() => this.props.dispatch(actionCreators.userNextPage())}
                    >
                        <AddIcon style={{ fontSize: 16 }} />
                    </Button>
                </div>
            )
        }


    }

    render() {

        return (
            <MasterTemplate>

                <div className="container pt-3" style={{ minHeight: '70vh', width: '100%' }}>
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