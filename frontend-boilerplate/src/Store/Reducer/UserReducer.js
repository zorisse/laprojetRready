import * as actionTypes from '../action'

const initialState = {
    currentUser: null,
    currentUserFull: null,
    lapin: 'TEST',

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_USER:
            return { ...state, currentUser: action.currentUser };
        case actionTypes.STORE_USER_FULL:
            console.log('reduce: ', action.currentUserFull);
            return { ...state, currentUserFull: action.currentUserFull };
        // case actionTypes.add5:
        //     console.log(action.value);

        //     return { ...state, counter: state.counter + action.value }
        // case actionTypes.take5:
        //     return { ...state, counter: state.counter - action.value }
        default: return state
    }

}

export default reducer;