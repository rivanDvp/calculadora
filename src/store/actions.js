import {
    WRITING_NUMBER,
    SELECT_OPERATOR,
    CALCULATE_RESULT,
    RESET_OPERATION,
    ADD_DECIMAL_POINT,
    DELETE_CHART,
    PERCETAGE_TO_DECIMAL,
    ADD_PARENTHESES
} from "./constans"

function writeNumber(digit) {
    return {
        type: WRITING_NUMBER,
        payload:digit
    }
};

function selectOperator(operator){
    return{
        type:SELECT_OPERATOR,
        payload:operator
    }
}

function calculateResult(){
    return {type:CALCULATE_RESULT}
}

function resetOperation(){
    return { type: RESET_OPERATION}
}

function addDecimalPoint(){
    return {type: ADD_DECIMAL_POINT}
}

function deleteChart(){
    return {type:DELETE_CHART}
}

function percentageToDecimal(){
    return {type:PERCETAGE_TO_DECIMAL}
}

function addParentheses(){
    return {type:ADD_PARENTHESES}
}

export {
    writeNumber,
    selectOperator,
    calculateResult,
    resetOperation,
    addDecimalPoint,
    deleteChart,
    percentageToDecimal,
    addParentheses
}