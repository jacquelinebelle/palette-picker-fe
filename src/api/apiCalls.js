export const fetchProjects = async () => {
  try {
    const response = await fetch('https://palette-picker-backend.herokuapp.com/api/v1/projects')
    const projects = await response.json();
    if (response.ok) {
      return projects.projects
    } else {
      throw new Error('Cannot fetch projects')
    }
  } catch (error) {
    throw new Error('Cannot fetch projects')
  }      
}

export const fetchPalettes = async id => {
  try {
    const response = await fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}/palettes`)
    const palettes = await response.json();
    if (response.ok) {
      return palettes.palettes
    } else {
      throw new Error('Cannot fetch palettes')
    }
  } catch (error) {
    throw new Error('Cannot fetch palettes')
  }   
}

export const fetchProject = async (id) => {
  try {
    const response = await fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}`)
    const project = await response.json();
    return project.project[0];
  } catch (error) {
    throw new Error('Cannot fetch project')
  }      
}

export const fetchPalette = async (id) => {
  try {
    const response = await fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/palettes/${id}`)
    const palette = await response.json();
    return palette;
  } catch (error) {
    console.log(error)
  }      
}

export const fetchAddProject = projectName => {
    return  fetch('https://palette-picker-backend.herokuapp.com/api/v1/projects', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({name: projectName})
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Cannot add project')
      }
    }).then(data =>  data.project)
  }


  export const fetchAddPalette = (id, newPalette) => {
    return  fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}`, {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({ ...newPalette })
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Cannot add palette')
      }
    }).then(data =>  data.palette)
  }

  export const fetchDeleteProject = id => {
    return  fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Cannot delete project')
      }
    }).then(data =>  data.project)
  }

  export const fetchDeletePalette = id => {
    return  fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/palettes/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Cannot delete palette')
      }
      
    }).then(data =>  data.palette)
  }

export const fetchPatchProject = async (id, body) => {
  try {
      const response = await fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}`, {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(body)
    })
      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        throw new Error('Cannot modify project')
      }
    } catch (error) {
      throw new Error('Cannot modify project')
    }      
  }
  

export const fetchPatchPalette = async (id, body) => {
  try {
      const response = await fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/palettes/${id}`, {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(body)
    })
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error('Cannot modify palette')
    }
  } catch (error) {
    throw new Error('Cannot modify palette')
  }    
}