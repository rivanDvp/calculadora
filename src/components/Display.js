
import React from 'react'
import { useSelector } from 'react-redux'

import './Display.css'

function Display() {
   const ans=useSelector(state=>state.ans)
   const {number_in_writing,last_operator,operation_stack,error}=useSelector(state=>state)
    return (
        <div className="display">
            <div className="display-section">
                {operation_stack}
                {number_in_writing}
                {last_operator}
                </div>
            <div className="display-section">
                <span className="error">{error}</span>
                {ans}</div>
        </div>
    )
}

export default Display
