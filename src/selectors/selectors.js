export const findIndexSticker = (state, id) => state.findIndex((obj) => obj.get('id') === id);
export const getStiker = (state, id) => state.get(state.findIndex((obj) => obj.get('id') === id));
export const getTaskstoJS = (state, id) => getStiker(state, id).toJS().tasks;