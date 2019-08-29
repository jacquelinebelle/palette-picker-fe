export const flip = (state = false, action) => {
    switch(action.type) {
      case 'FLIP_SELECT':
        return action.bool
      default:
        return state;
    }
  }