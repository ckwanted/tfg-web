import React, {Component} from 'react'

import {Constant} from '../../commons'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'

class Quiz extends Component {

    constructor(props) {
        super(props)

        this.state = {
            step: 0,
            points: 0,

            value: new Set(),
        }
    }

    _onChange = (e) => {
        e.preventDefault()

        let newSet = new Set()
        newSet.add(Number(e.target.value))
        this.setState({value: newSet})
    }

    _onCheck = (e) => {
        e.preventDefault()

        let newSet = new Set(this.state.value)
        if(newSet.has(Number(e.target.name))) newSet.delete(Number(e.target.name))
        else newSet.add(Number(e.target.name))

        this.setState({value: newSet})
    }

    _valueSelected = () => {
        for(let item of this.state.value.values()) {
            return item
        }
    }

    _renderAnswers = (DATA) => {

        if(DATA) {

            const TYPE = typeof DATA.result === "number" ? Constant.SIMPLE : Constant.MULTIPLE
            let answers
            const IS_LAST_ANSWER = DATA.answers.length === this.state.step

            if(TYPE === Constant.SIMPLE) {
                const ITEMS = DATA.answers.map( (answer, i) => {
                    return(
                        <RadioButton
                            key={i}
                            value={i}
                            label={answer}
                            labelStyle={{fontSize: '14px'}}
                            iconStyle={{fill: '#42648e'}}
                        />
                    )
                })
                answers = (
                    <RadioButtonGroup
                        name="answer"
                        onChange={this._onChange}
                        valueSelected={this._valueSelected()}
                    >
                        {ITEMS}
                    </RadioButtonGroup>
                )
            }
            else {
                answers = DATA.answers.map( (answer, i) => {
                    return(
                        <Checkbox
                            name={`${i}`}
                            key={i}
                            label={answer}
                            iconStyle={{marginRight: '5px', fill: '#42648e'}}
                            labelStyle={{fontSize: '14px'}}
                            onCheck={this._onCheck}
                            checked={this.state.value.has(i)}
                        />
                    )
                })
            }

            const VALUE_LENGTH = this.state.value.size

            return(
                <div className="mt-4">
                    {answers}

                    <button
                        className={!VALUE_LENGTH ? 'button mt-3 w-100 bg-gray' : 'button mt-3 w-100'}
                        onClick={(e) => this._handleClick(e, DATA, TYPE)}
                        disabled={!VALUE_LENGTH}
                    >
                        {IS_LAST_ANSWER ? 'Finalizar' : 'Siguiente'}
                    </button>
                </div>
            )
        }

    }

    _handleClick = (e, DATA, TYPE) => {
        e.preventDefault()

        if(TYPE === Constant.SIMPLE){
            this.setState((prevState, props) => {
                return {
                    step: prevState.step + 1,
                    points: prevState.value.has(DATA.result) ? prevState.points + 1 : prevState.points,
                    value: new Set(),
                }
            })
        }
        else {
            let points = 0

            for(let i = 0; DATA.result.length; i++) {
                if(this.state.value.has(DATA.result[i])) points++
            }

            points = (points) / DATA.result.length

            this.setState((prevState, props) => {
                return {
                    step: prevState.step + 1,
                    points: points,
                    value: new Set(),
                }
            })
        }

    }

    render() {

        const {step} = this.state
        const MODAL_DATA = this.props.courses.modalData

        if(!MODAL_DATA) {
            this.props.dispatch(actionCreators.closeModal())
            return <div />;
        }

        if(MODAL_DATA.length === step) {
            return(
                <div>
                    <h2>Tu puntuación</h2>
                    <p className="mt-4">{(this.state.points * 10) / MODAL_DATA.length}</p>
                </div>
            )
        }

        const DATA = MODAL_DATA[step]

        return (
            <div className="modal-content">

                <div className="quiz">
                    <h2>{step + 1}. {DATA.question}</h2>
                    {this._renderAnswers(DATA)}
                </div>

            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        courses: state.courseReducer
    }
}

export default connect(mapStateToProps)(Quiz)