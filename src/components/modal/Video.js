import React from 'react'

import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import { Player, BigPlayButton } from 'video-react'

const Video = (props) => {

    const MODAL_DATA = props.courses.modalData

    if(!MODAL_DATA) {
        props.dispatch(actionCreators.closeModal())
        return <div />;
    }
    
    return (
        <div className="modal-content">

            <Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
                <BigPlayButton position="center" />
            </Player>

        </div>
    )


}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps)(Video)