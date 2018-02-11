import Immutable from 'immutable';
import { List } from 'immutable';
import {findIndexSticker, getStiker} from "../selectors/selectors";

const initialState = List([]);
const ADD_STICKER = 'ADD_STICKER';
const DELETE_STICKER = 'DELETE_STICKER';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';

// SELECTORS
// const findIndexSticker = (state, id) => state.findIndex((obj) => obj.get('id') === id);

export default function stickers(state = initialState, action) {
    switch (action.type) {
        case ADD_STICKER :
            return state.push(action.payload);
        case DELETE_STICKER :
            return state.delete(findIndexSticker(state, action.id));
        case ADD_TASK:
            return state.update(
                findIndexSticker(state, action.id),
                    item => item.set('tasks', item.get('tasks').push({id: action.index, name: action.name})));
        case EDIT_TASK_NAME:
            let tasks = getStiker(state, action.id).toJS().tasks;
            tasks.find(obj => obj.id === action.idTask).name = action.name;
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', tasks));
        default:
            return state;
    }
}