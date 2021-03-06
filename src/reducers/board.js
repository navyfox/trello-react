import {fromJS} from 'immutable';

const initialState = fromJS({
    stickers: [
        {
            id: 0,
            name: 'TODO',
            tasks: []
        },
        {
            id: 1,
            name: 'In Progress',
            tasks: []
        },
        {
            id: 2,
            name: 'Testing',
            tasks: []
        },
        {
            id: 3,
            name: 'Done',
            tasks: []
        }
    ]
});

const GET_USER_NAME = 'GET_USER_NAME';
const ADD_STICKER = 'ADD_STICKER';
const EDIT_STICKER = 'EDIT_STICKER';
const DELETE_STICKER = 'DELETE_STICKER';
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK_DESCRIPTION = 'EDIT_TASK_DESCRIPTION';
const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT';
const EDIT_TASK_COMMENT = 'EDIT_TASK_COMMENT';
const DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT';

export const getUserName = (userName) => (dispatch) => {
    dispatch({
        type: 'GET_USER_NAME',
        userName
    });
};

export const addSticker = (name) => (dispatch) => {
    const payload = {
        id: Date.now(),
        name,
        tasks: []
    };
    dispatch({
        type: 'ADD_STICKER',
        payload: payload
    });
};

export const editSticker = (id, name) => (dispatch) => {
    dispatch({
        type: 'EDIT_STICKER',
        id,
        name
    })
};

export const delSticker = (id) => (dispatch) => {
    dispatch({
        type: 'DELETE_STICKER',
        id
    })
};

export const addTask = (name, id) => (dispatch) => {
    dispatch({
        type: 'ADD_TASK',
        id,
        name,
        index: Date.now()
    });
};

export const editTaskName = (id, idTask, name) => (dispatch) => {
    dispatch({
        type: 'EDIT_TASK_NAME',
        id,
        idTask,
        name
    });
};

export const delTask = (id, idTask) => (dispatch) => {
    dispatch({
        type: 'DELETE_TASK',
        id,
        idTask
    });
};

export const editTaskDescription = (id, idTask, description) => (dispatch) => {
    dispatch({
        type: 'EDIT_TASK_DESCRIPTION',
        id,
        idTask,
        description
    })
};

export const addTaskComment = (id, idTask, comment) => (dispatch) => {
    dispatch({
        type: 'ADD_TASK_COMMENT',
        id,
        idTask,
        comment
    })
};

export const editTaskComment = (id, idTask, idComment, comment) => (dispatch) => {
    dispatch({
        type: 'EDIT_TASK_COMMENT',
        id,
        idTask,
        idComment,
        comment
    })
};

export const delTaskComment = (id, idTask, idComment) => (dispatch) => {
    dispatch({
        type: 'DELETE_TASK_COMMENT',
        id,
        idTask,
        idComment
    })
};

const ACTION_HANDLERS = {
    [GET_USER_NAME]: (state, action) => state.update('userName', () => action.userName),
    [ADD_STICKER]: (state, action) => state.updateIn(['stickers'], stickers => stickers.push(fromJS(action.payload))),
    [EDIT_STICKER]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.set('name', fromJS(action.name))));
    },
    [DELETE_STICKER]: (state, action) => state.updateIn(['stickers'], stickers => {
        return stickers.delete(stickers.findIndex((obj) => obj.get('id') === action.id));
    }),
    [ADD_TASK]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            return tasks.push(fromJS({
                id: action.index,
                name: action.name,
                description: '',
                comments: []
            }))
        })));
    },
    [EDIT_TASK_NAME]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.set('name', fromJS(action.name)));
        })));
    },
    [DELETE_TASK]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            return tasks.delete(tasks.findIndex(obj => obj.get('id') === action.idTask))
        })));
    },
    [EDIT_TASK_DESCRIPTION]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.set('description', fromJS(action.description)));
        })));
    },
    [ADD_TASK_COMMENT]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.updateIn(['comments'], comments => {
                return comments.push(fromJS({
                    id: Date.now(),
                    comment: action.comment
                }));
            }));
        })));
    },
    [EDIT_TASK_COMMENT]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.updateIn(['comments'], comments => {
                const commentIndex = comments.findIndex(comment => comment.get('id') === action.idComment);
                return comments.update(commentIndex, comment => comment.set('comment', fromJS(action.comment)));
            }));
        })));
    },
    [DELETE_TASK_COMMENT]: (state, action) => {
        const stickerIndex = state.get('stickers').findIndex(sticker => sticker.get('id') === action.id);
        return state.updateIn(['stickers'], stickers => stickers.update(stickerIndex, sticker => sticker.updateIn(['tasks'], tasks => {
            const taskIndex = tasks.findIndex(task => task.get('id') === action.idTask);
            return tasks.update(taskIndex, task => task.updateIn(['comments'], comments => {
                const commentIndex = comments.findIndex(comment => comment.get('id') === action.idComment);
                return comments.delete(commentIndex);
            }));
        })));
    }
};

export default function board(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}