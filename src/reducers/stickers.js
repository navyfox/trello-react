import Immutable from 'immutable';
import {List} from 'immutable';
import {findIndexSticker, getTaskstoJS, updateTasks} from "../selectors/selectors";

const initialState = List([]);
const ADD_STICKER = 'ADD_STICKER';
const DELETE_STICKER = 'DELETE_STICKER';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK_DESCRIPTION = 'EDIT_TASK_DESCRIPTION';
const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT';
const DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT';

export default function stickers(state = initialState, action) {
    let tasks;
    switch (action.type) {
        case ADD_STICKER :
            return state.push(action.payload);
        case DELETE_STICKER :
            return state.delete(findIndexSticker(state, action.id));
        case ADD_TASK:
            tasks = getTaskstoJS(state, action.id);
            tasks.push({
                id: action.index,
                name: action.name,
                description: '',
                comments: []
            });
            return updateTasks(state, action.id, tasks);
        case EDIT_TASK_NAME:
            tasks = getTaskstoJS(state, action.id);
            tasks.find(obj => obj.id === action.idTask).name = action.name;
            return updateTasks(state, action.id, tasks);
        case DELETE_TASK:
            tasks = getTaskstoJS(state, action.id);
            tasks.splice(tasks.indexOf(tasks.find(obj => obj.id === action.idTask)), 1);
            return updateTasks(state, action.id, tasks);
        case EDIT_TASK_DESCRIPTION:
            tasks = getTaskstoJS(state, action.id);
            tasks.find(obj => obj.id === action.idTask).description = action.description;
            return updateTasks(state, action.id, tasks);
        case ADD_TASK_COMMENT:
            tasks = getTaskstoJS(state, action.id);
            tasks.find(obj => obj.id === action.idTask).comments.unshift(action.comment);
            return updateTasks(state, action.id, tasks);
        case DELETE_TASK_COMMENT:
            tasks = getTaskstoJS(state, action.id);
            tasks.find(obj => obj.id === action.idTask).comments.splice(action.idComment, 1);
            return updateTasks(state, action.id, tasks);
        default:
            return state;
    }
}