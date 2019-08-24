export const getProjects = () => {
  return  fetch('http://localhost:3001/api/v1/projects')
        .then(res =>{
            if(res.ok) {
                return res.json()
            } else {
                return "Error fetching projects"
            }
        })
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
      console.log('fetching...')
    return  fetch(`http://localhost:3001/api/v1/projects/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
  }

// export const getProjects = async () => {
//     try {
//         const response = await fetch('http://localhost:3001/api/v1/projects');
//         if (!response.ok) {
//             throw new Error('Error fetching projects');
//         }
//         const projects = await response.json();
//         return projects;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// export const addProject = async (name) => {
//     try {
//         console.log(name)
//         const response = await fetch('http://localhost:3001/api/v1/projects', {
//             method: 'POST',
//             body: name,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Origin': 'http://localhost:3001/',
//                 'Access-Control-Allow-Origin': 'http://localhost:3000/'
//             }
//         });
//         if (!response.ok) {
//             throw new Error('Error posting new project');
//         }
//         console.log(response);
//         const project = await response.json();
//         return project;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }