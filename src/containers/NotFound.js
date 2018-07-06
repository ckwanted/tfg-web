import React, { Component } from 'react'

import MasterTemplate from './MasterTemplate'

class NotFound extends Component {

    render() {

        return (
            <MasterTemplate>

                <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh', width: '100%' }}>

                    <div className="text-center">
                        <h1>404</h1>
                        <p>Página no encontrada ...</p>
                    </div>

                </div>

            </MasterTemplate>
        )

    }

}

export default NotFound