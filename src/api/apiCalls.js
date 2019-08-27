export const fetchProjects = async () => {
  try {
    const response = await fetch('https://palette-picker-backend.herokuapp.com/api/v1/projects')
    const projects = await response.json();
    return projects.projects
  } catch (error) {
    console.log(error)
  }      
}

export const fetchAddProject = projectName => {
  console.log('bb')
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

  export const fetchPalettes = async id => {
    try {
      const response = await fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}/palettes`)
      if (!response.ok) {
        return '404'
      }
      const palettes = await response.json();
      return palettes.palettes;
    } catch (error) {
      return 'no palettes here';
    }
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

  export const fetchPatchProject = (id, body) => {
      return  fetch(`https://palette-picker-backend.herokuapp.com/api/v1/projects/${id}`, {
          method: 'PATCH',
          headers: {'Content-type' : 'application/json'},
          body: JSON.stringify({body})
      })
      .then(res => {
        if (res.ok) {
         return res.json()
        } else {
          throw new Error('Cannot modify project')
        }
      }).then(data =>  data.project)
    }