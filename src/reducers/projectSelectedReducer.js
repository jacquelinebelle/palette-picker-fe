export const projectSelectedReducer = (state = 0, action) => {
  switch(action.type) {
    case 'PROJECT_SELECTED':
      return action.selected
    default:
      return state;
  }
}