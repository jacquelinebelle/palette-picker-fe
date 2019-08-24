export const setGeneratedColors = (colors) => ({
    type: 'SET_GENERATED_COLORS',
    colors
});

export const addProject = (name) => ({
    type: 'ADD_PROJECT',
    name
});

export const savePalette = (project_id, palette_id) => ({
    type: 'SAVE_PALETTE',
    project_id, 
    palette_id
});