export const getStiker = (state, id) => {
    return state.get('board').get('stickers').get(state.get('board').get('stickers').findIndex((obj) => obj.get('id') === id))
};
export const getTask = (state, id, idTask) => {
    return getStiker(state, id).get('tasks').get(getStiker(state, id).get('tasks').findIndex(obj => obj.get('id') === idTask));
};