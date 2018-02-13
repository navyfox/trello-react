import Immutable from 'immutable';
import {List} from 'immutable';

const initialState = List([]);
const ADD_STICKER = 'ADD_STICKER';
const DELETE_STICKER = 'DELETE_STICKER';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK_DESCRIPTION = 'EDIT_TASK_DESCRIPTION';
const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT';
const DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT';


const ACTION_HANDLERS = {
    [ADD_STICKER]: (state, action) => state.push(action.payload),
    [DELETE_STICKER]: (state, action) => state.delete(state.findIndex((obj) => obj.get('id') === action.id)),
    [ADD_TASK]: (state, action) => {
        const stikerIndex = state.findIndex(sticker => sticker.get('id') === action.id);
        return state.update(stikerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            return tasks.push(Immutable.fromJS({
                id: action.index,
                name: action.name,
                description: '',
                comments: []
            }))
        }));
    },
    [EDIT_TASK_NAME]: (state, action) => {
        const stikerIndex = state.findIndex(sticker => sticker.get('id') === action.id);
        return state.update(stikerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            console.log(taskIndex);
            return tasks.update(taskIndex, task => task.set('name', action.name));
        }));
    },
    [EDIT_TASK_DESCRIPTION]: (state, action) => {
        const stikerIndex = state.findIndex(sticker => sticker.get('id') === action.id);
        return state.update(stikerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.set('description', action.description));
        }));
    },
    [ADD_TASK_COMMENT]: (state, action) => {
        const stikerIndex = state.findIndex(sticker => sticker.get('id') === action.id);
        return state.update(stikerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.updateIn(['comments'], comments => {
                return comments.insert(0, action.comment);
            }));
        }));
    },
    [DELETE_TASK_COMMENT]: (state, action) => {
        const stikerIndex = state.findIndex(sticker => sticker.get('id') === action.id);
        return state.update(stikerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.updateIn(['comments'], comments => {
                return comments.delete(action.idComment);
            }));
        }));
    }
};

export default function stickers(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}