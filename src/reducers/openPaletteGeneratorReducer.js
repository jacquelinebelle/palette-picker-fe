let defaulState = {
  open: false,
  type: 'Add',
  paletteUpdatingId: 0,
  paletteUpdatingName: ''
}

export const openPaletteGeneratorReducer = (state = defaulState, action) => {

  switch (action.type) {
    case 'OPEN_PALETTE_GENERATOR':
      let newPalette = {...state};
      newPalette.open = !state.open;
      newPalette.type = action.paletteActionType;
      newPalette.paletteUpdatingId = action.paletteUpdatingId;
      newPalette.paletteUpdatingName = action.paletteUpdatingName;
      return newPalette
    default:
      return state;
  }
}