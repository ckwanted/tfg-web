import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'

import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Navigation extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    _onClose = () => {
        document.body.removeAttribute("style")
        this.setState({open: false})
    }

    render() {
        const {location} = this.props.router
        const { classes } = this.props

        const LIST_ITEM_TEXT_STYLE = {
            padding: '5px 15px'
        }

        const sideList = (
            <div className={classes.list}>
                <List>
                    <Link to="/"><ListItemText primary="Inicio" style={LIST_ITEM_TEXT_STYLE} /></Link>
                </List>
                <Divider />
                <List>
                    <Link to="/courses"><ListItemText primary="Cursos" style={LIST_ITEM_TEXT_STYLE} /></Link>
                </List>
                <Divider />
                <List>
                    <Link to="/teachers"><ListItemText primary="Profesores" style={LIST_ITEM_TEXT_STYLE} /></Link>
                </List>
                <Divider />
                <List>
                    <Link to="/about"><ListItemText primary="Sobre Nosotros" style={LIST_ITEM_TEXT_STYLE} /></Link>
                </List>
                <Divider />
            </div>
        )

        return (
            <section className="nav-wrapper">

                <div className="container d-flex">

                    <div className="m-r-auto">
                        <Link to="/">
                            <img className="logo" src="/images/ulpgc-course-1x.png" alt="logo" />
                        </Link>
                    </div>

                    <nav className="nav d-flex">
                        <i className="fa fa-bars" onClick={() => this.setState({open: true})} />
                        <ul className="p-0px m-0px">
                            <li className="p-l-10px p-r-10px">
                                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/courses" className={location.pathname.indexOf('/courses') !== -1 ? 'active' : ''}>Cursos</Link>
                            </li>
                            <li className="p-l-10px p-r-10px">
                                <Link to="/teachers" className={location.pathname === '/teachers' ? 'active' : ''}>Profesores</Link>
                            </li>
                            <li>
                                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Sobre Nosotros</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="drawer-wrapper">
                        <Drawer className="visibility-child" anchor="right" open={this.state.open} onClose={this._onClose}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this._onClose}
                                onKeyDown={this._onClose}
                            >
                                {sideList}
                            </div>
                        </Drawer>
                    </div>

                </div>

            </section>
        )

    }

}

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}

const mapStateToProps = (state) => {
    return {
        router: state.routerReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Navigation))