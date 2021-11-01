import React from 'react'
import './keypad.css'
import * as actions from '../store/actions'
/*import {
    WRITING_FIRST_NUMBER,
    WRITING_SECOND_NUMBER,
    SELECT_OPERATOR,
    CALCULATE_RESULT,
    RESET_OPERATION
} from "../store/constans"*/

import { useSelector,useDispatch } from 'react-redux'

function Keypad() {
    const status = useSelector(state => state.status)
    return (
        <div className='container'>
            <Button value={"AC"} type="operator" />
            <Button value={"()"} type="operator" />
            <Button value={"%"} type="operator" />
            <Button value={"/"} type="operator" />
            <Button value={"7"} status={status} type="number" />
            <Button value={"8"} status={status} type="number" />
            <Button value={"9"} status={status} type="number" />
            <Button value={"*"} type="operator" />
            <Button value={"4"} status={status} type="number" />
            <Button value={"5"} status={status} type="number" />
            <Button value={"6"} status={status} type="number" />
            <Button value={"-"} type="operator" />
            <Button value={"1"} status={status} type="number" />
            <Button value={"2"} status={status} type="number" />
            <Button value={"3"} status={status} type="number" />
            <Button value={"+"} type="operator" />
            <Button value={"0"} status={status} type="number" />
            <Button value={"."} type="operator" />
            <Button value={"Del"} type="operator" />
            <Button value={"="} type="operator" />
        </div>
    )
}


function Button(props) {
    
    const dispatch=useDispatch()

    const styleBtn = (type, value) => {
        if (value === 'AC' || value === 'Del') {
            return "button AC-btn"
        } else if (type === "number" || value === '.') {
            return "button number-btn"
        } else if (type === "operator") {
            return "button operator-btn"
        }
    }

    const handleOnClick = (e) => {
        //e.preventDefault()

        if (props.type ==="number") {
            return actions.writeNumber(props.value);
        } else if(props.value==="="){            
            return actions.calculateResult()
        }else if(props.value==="AC"){
            return actions.resetOperation()
        }else if(props.value==="."){
            return actions.addDecimalPoint()
        }else if(props.value==="Del"){
            return actions.deleteChart()
        }else if(props.value==="%"){
            return actions.percentageToDecimal()
        }else if(props.value=="()"){
            return actions.addParentheses()
        }else {
            return actions.selectOperator(props.value)
        }
    }//end handleOnClick

    return (
        <button className={styleBtn(props.type, props.value)}
        onClick={()=>dispatch(handleOnClick())}
        >
            {props.value}
        </button>
    )
}




export default Keypad


