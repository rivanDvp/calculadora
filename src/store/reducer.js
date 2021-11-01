
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

const initialState = {
    number_in_writing: [],
    operation_stack: [],
    last_operator: "",
    ans: "0",
    status: WRITING_NUMBER,
    open_parentheses:false,
    error:""
}

const rootReducers = (state = initialState, { type, payload }) => {
    switch (type) {
        case WRITING_NUMBER:
            if (state.last_operator === "" && state.status === WRITING_NUMBER) {
                let wn = {
                    status: type,
                    number_in_writing: [...state.number_in_writing, payload]
                }
                return Object.assign({}, state, wn)
            } else if (state.last_operator !== "" && state.status === SELECT_OPERATOR) {
                let wn = {
                    number_in_writing: [...state.number_in_writing, payload],
                    operation_stack: [...state.operation_stack, state.last_operator],
                    last_operator: "",
                    status: type
                }
                return Object.assign({}, state, wn)
            } else {
                return state
            }

        case SELECT_OPERATOR:
            if (state.number_in_writing.length && state.status === WRITING_NUMBER) {
                let so = {
                    number_in_writing: [],
                    last_operator: payload,
                    operation_stack: [...state.operation_stack, state.number_in_writing.join('')],
                    status: type
                }
                return Object.assign({}, state, so)
            } else if (!state.number_in_writing.length && state.status === SELECT_OPERATOR) {
                let so = {
                    last_operator: payload,
                    status: type
                }
                return Object.assign({}, state, so)
            } else if(state.operation_stack.slice(-1)[0].search(/\d+/)!==-1&&!state.number_in_writing.length){
                let so={
                    last_operator:payload,
                    status:type
                }
                return Object.assign({}, state, so)
            }else {
                return state;
            }

        case ADD_DECIMAL_POINT:
            if (state.status === WRITING_NUMBER) {
                let number = state.number_in_writing
                if (number.length && number.indexOf(".") === -1) {
                    let adp = {
                        number_in_writing: [...state.number_in_writing, "."]
                    }
                    return Object.assign({}, state, adp)
                } else if (!number.length) {
                    let adp = {
                        number_in_writing: ["0."]
                    }
                    return Object.assign({}, state, adp)
                } else {
                    return state
                }
            } else {
                return state
            }
        case PERCETAGE_TO_DECIMAL:
            if (state.status === WRITING_NUMBER&&state.number_in_writing.length) {
                let number = state.number_in_writing.join('')
                let newNumber = eval(`${number}/100`)
                let ptd = {
                    number_in_writing: newNumber.toString().split(''),
                    status: WRITING_NUMBER
                }
                return Object.assign({}, state, ptd)
            } else {
                return state;
            }
        case ADD_PARENTHESES:
            let parentheses=state.open_parentheses?')':'(';
            let dp={}
            if(state.status===WRITING_NUMBER){
                dp={
                    number_in_writing:[],
                    operation_stack:[
                        ...state.operation_stack,
                        state.number_in_writing.join(''),
                        parentheses
                    ],
                    open_parentheses:!state.open_parentheses,
                    status:state.open_parentheses?SELECT_OPERATOR:WRITING_NUMBER
                }
            }else if(state.status===SELECT_OPERATOR){
                dp={
                    last_operator:"",
                    operation_stack:[
                        ...state.operation_stack,
                        state.last_operator,
                        parentheses
                    ],
                    status:WRITING_NUMBER,
                    open_parentheses:!state.open_parentheses
                }
            }else{
                return state
            }
            return Object.assign({},state,dp)
        case CALCULATE_RESULT:
            if (state.operation_stack.length) {
               try{
                let expression = [...state.operation_stack, state.number_in_writing.join('')];
                let ans = eval(expression.join(''))
                let cr = {
                    number_in_writing: `${ans}`.split(''),
                    status: WRITING_NUMBER,
                    ans
                }
                return Object.assign({}, initialState, cr)
               }catch(error){
                console.error(error)
                return Object.assign({},state,{error:"syntax_err"})
               }
                
            } else {
                return state
            }
        case DELETE_CHART:
            let number = state.number_in_writing;
            let stack = state.operation_stack;
            if (number.length&&state.status===WRITING_NUMBER) {
                let dc = {
                    number_in_writing: number.slice(0, number.length - 1),
                    status: WRITING_NUMBER
                }
                return Object.assign({}, state, dc)
            } else if (!number.length && stack.length&&state.status===WRITING_NUMBER) {
                let newStack = stack.slice()
                let elementToModify = newStack.pop().split('')
                let elementModified = elementToModify.slice(0, elementToModify.length - 1)


                let dc = {
                    number_in_writing: elementModified,
                    operation_stack: newStack,
                    status: WRITING_NUMBER
                }
                return Object.assign({}, state, dc)
            } else if(state.status===SELECT_OPERATOR){
                let newStack = stack.slice()
                let newNumber = newStack.pop().split('')

                if(newNumber[0]=='('||newNumber[0]==')'){
                    newNumber=[]
                }

                let dc = {
                    number_in_writing:newNumber,
                    operation_stack:newStack,
                    last_operator:'',
                    status: WRITING_NUMBER
                }
                return Object.assign({}, state, dc)
            }else {
                return state
            }
        case RESET_OPERATION:
            return initialState
        default:
            return state
    }

}

export default rootReducers