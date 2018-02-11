import Immutable from 'immutable';
import {List} from 'immutable';
import {findIndexSticker, getStiker} from "../selectors/selectors";

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
    switch (action.type) {
        case ADD_STICKER :
            return state.push(action.payload);
        case DELETE_STICKER :
            return state.delete(findIndexSticker(state, action.id));
        case ADD_TASK:
            let arrAddTasks = getStiker(state, action.id).toJS().tasks;
            arrAddTasks.push({
                id: action.index,
                name: action.name,
                description: '',
                comments: []
            });
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
        case EDIT_TASK_DESCRIPTION:
            let arrTasksDescription = getStiker(state, action.id).toJS().tasks;
            arrTasksDescription.find(obj => obj.id === action.idTask).description = action.description;
            const newArrTasksDescription = Immutable.fromJS(arrTasksDescription);
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', newArrTasksDescription));
        case ADD_TASK_COMMENT:
            let arrTasksComment = getStiker(state, action.id).toJS().tasks;
            arrTasksComment.find(obj => obj.id === action.idTask).comments.unshift(action.comment);
            const newArrTasksComment = Immutable.fromJS(arrTasksComment);
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', newArrTasksComment));
        case DELETE_TASK_COMMENT:
            let arrComments = getStiker(state, action.id).toJS().tasks;
            arrComments.find(obj => obj.id === action.idTask).comments.splice(action.idComment, 1);
            const newArrComments = Immutable.fromJS(arrComments);
            return state.update(findIndexSticker(state, action.id), item => item.set('tasks', newArrComments));
        default:
            return state;
    }
}