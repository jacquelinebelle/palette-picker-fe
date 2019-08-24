export const getProjects = () => {
  return  fetch('http://localhost:3001/api/v1/projects')
        .then(res => res.json())
        .catch(error => {
            throw new Error(error.message)
        })
}

export const addProject = projectName => {
    return  fetch('http://localhost:3001/api/v1/projects', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({name: projectName})
    })
    .then(res => res.json())
  }

  export const deleteProject = id => {
    return  fetch(`http://localhost:3001/api/v1/projects/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
  }


  export const getPalettes = id => {
    return  fetch(`http://localhost:3001/api/v1/projects/${id}/palettes`)
          .then(res =>
             res.json()
          )
          .catch(error => {
              throw new Error(error.message)
          })
  }