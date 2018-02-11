import Immutable from 'immutable';
import { List } from 'immutable';
import {findIndexSticker, getStiker} from "../selectors/selectors";

const initialState = List([]);
const ADD_STICKER = 'ADD_STICKER';
const DELETE_STICKER = 'DELETE_STICKER';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';
const DELETE_TASK = 'DELETE_TASK';

// SELECTORS
// const findIndexSticker = (state, id) => state.findIndex((obj) => obj.get('id') === id);

export default function stickers(state = initialState, action) {
    switch (action.type) {
        case ADD_STICKER :
            return state.push(action.payload);
        case DELETE_STICKER :
            return state.delete(findIndexSticker(state, action.id));
        case ADD_TASK:
            let arrAddTasks = getStiker(state, action.id).toJS().tasks;
            arrAddTasks.push({id: action.index, name: action.name});
            const newArrAddTasks = Immutable.fromJS(arrAddTasks);
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', newArrAddTasks));
        case EDIT_TASK_NAME:
            let arrTasksName = getStiker(state, action.id).toJS().tasks;
            arrTasksName.find(obj => obj.id === action.idTask).name = action.name;
            const newArrTasksName = Immutable.fromJS(arrTasksName);
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', newArrTasksName));
        case DELETE_TASK:
            let arrDeleteTask = getStiker(state, action.id).toJS().tasks;
            arrDeleteTask.splice(arrDeleteTask.indexOf(arrDeleteTask.find(obj => obj.id === action.idTask)), 1);
            const newArrDeleteTask = Immutable.fromJS(arrDeleteTask);
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', newArrDeleteTask));
        default:
            return state;
    }
}