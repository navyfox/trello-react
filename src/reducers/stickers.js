import Immutable from 'immutable';
import { List } from 'immutable';

const initialState = List([]);
const ADD_STICKER = 'ADD_STICKER';
const DELETE_STICKER = 'DELETE_STICKER';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';

export default function stickers(state = initialState, action) {
    switch (action.type) {
        case ADD_STICKER :
            return state.push(action.payload);
        case DELETE_STICKER :
            return state.delete(state.findIndex((obj) => obj.get('id') === action.payload));
        case ADD_TASK:
            let index = state.findIndex((obj) => obj.get('id') === action.id);
            // let newState = state[index].tasks.push(action.name);
            // console.log(state.set(index).toJS());
            // newState[index].tasks.push(action.name);
            // console.log(state.update(index, val => val.set('tasks', action.name)).toJS());
            console.log(action.name);
            console.log(state.get(index).get('tasks').push(action.name).toJS());
            let newArray = state.get(index).get('tasks').push(action.name);
            let superrNewArray = newArray.push(action.name);
            return state.update(index, item => item.set("tasks", item.get('tasks').push(action.name)));
        case EDIT_TASK_NAME:
        default:
            return state;
    }
}