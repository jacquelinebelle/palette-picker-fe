export const projectReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_PROJECT':
        state.push({id: state.length + 1, name: action.name, palettes: []})
        return state;
      case 'SAVE_PALETTE':
          let foundProject = state.find(proj => proj.id === action.project_id);
          foundProject.palettes.push(action.palette_id);
          return state;
      default:
        return state;
    }
  }