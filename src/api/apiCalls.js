export const fetchProjects = () => {
  return  fetch('http://localhost:3001/api/v1/projects')
        .then(res => {
          if (res.ok) {
           return res.json()
          } else {
            throw new Error('Cannot fetch projects')
          }
        }).then(data =>  data.projects)
}

export const fetchAddProject = projectName => {
    return  fetch('http://localhost:3001/api/v1/projects', {
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
    return  fetch(`http://localhost:3001/api/v1/projects/${id}`, {
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


  export const fetchPalettes = id => {
    return  fetch(`http://localhost:3001/api/v1/projects/${id}/palettes`)
              .then(res => {
                if (res.ok) {
                return res.json()
                } else {
                  return {palettes: 'Cannot fetch palettes'}
                }
              }).then(data =>  (data.palettes))
  }

  export const fetchAddPalette = (id, newPalette) => {
    return  fetch(`http://localhost:3001/api/v1/projects/${id}`, {
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
    return  fetch(`http://localhost:3001/api/v1/projects/palettes/${id}`, {
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

  export const fetchUpdatePalette = (id, updatedPalette) => {
    console.log(id)
    return  fetch(`http://localhost:3001/api/v1/projects/palettes/${id}`, {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({ ...updatedPalette})
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Cannot delete palette')
      }
      
    }).then(data =>  data.palette)
  }