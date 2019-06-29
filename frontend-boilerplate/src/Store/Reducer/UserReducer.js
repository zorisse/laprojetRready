import * as actionTypes from '../action'

const initialState = {
    currentUser: '',
    lapin: 'TEST',

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_USER:
            return { ...state, currentUser: action.currentUser }
        // case actionTypes.DEC:
        //     return { ...state, counter: state.counter - 1 }
        // case actionTypes.add5:
        //     console.log(action.value);

        //     return { ...state, counter: state.counter + action.value }
        // case actionTypes.take5:
        //     return { ...state, counter: state.counter - action.value }
        default: return state

    }

}

export default reducer;