export const openPaletteGeneratorReducer = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_PALETTE_GENERATOR':
      return !state;
    default:
      return state;
  }
}