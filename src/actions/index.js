export const setGeneratedColors = (colors) => ({
    type: 'SET_GENERATED_COLORS',
    colors
});

export const setProjects = projects => ({
    type: 'SET_PROJECTS',
    projects
}) 

export const setPalettes = palettes => ({
    type: 'SET_PALETTES',
    palettes
})

export const projectSelected = selected => ({
    type: 'PROJECT_SELECTED',
    selected
})

export const openPaletteGenerator = () => ({
    type: 'OPEN_PALETTE_GENERATOR',
})