const initialState = [];
const ADD_LIST = 'ADD_LIST';
const DELETE_LIST = 'DELETE_LIST';

export default function lists(state = initialState, action) {
    if (action.type === ADD_LIST) {
        return [
            ...state,
            action.payload
        ];
    } else if (action.type === DELETE_LIST) {
        state.splice(action.payload, 1);
        return state;
    }
    return state;
}