import { fetchProjects, fetchPalettes, fetchProject, fetchPalette, fetchAddProject, fetchAddPalette, fetchDeleteProject, fetchDeletePalette, fetchPatchProject, fetchPatchPalette} from '../api/apiCalls';


describe('apiCalls', () => {

    describe('fetchProjects', () => {
      let mockProject
      beforeEach( () => {
    
        mockProject = {projects: [{name: 'project'}]};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockProject)
          })
        })
      });
    
      it('fetchProjects should return a parsed response if status is ok', async () =>{
        const result = await fetchProjects();
        expect(result).toEqual(mockProject.projects)
      })
  
      it('fetchProjects should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve({
            ok: false,
          })
        })
        expect(fetchProjects()).rejects.toEqual(Error('Cannot fetch projects'))
      })
    });

    describe('fetchProject', () => {
      let mockProject
      beforeEach( () => {
        mockProject = {id: 1, name: 'project'};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockProject)
          })
        })
      });
    
      it('fetchProject should be called with the correct URL', async () =>{
        const expected = 'https://palette-picker-backend.herokuapp.com/api/v1/projects/1';
        fetchProject(1);
        expect(window.fetch).toHaveBeenCalledWith(expected)
      })
  
      it('fetchProject should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve({
            ok: false,
          })
        })
        expect(fetchProject()).rejects.toEqual(Error('Cannot fetch project'))
      })
    });

    describe('fetchAddProject', () => {
      let mockPalette
      beforeEach( () => {
    
        mockPalette = {project: [{name: 'project'}]};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockPalette)
          })
        })
      });
    
      it('fetchAddProject should return a parsed response if status is ok', async () =>{
        const result = await fetchAddProject();
        fetchAddProject()
        expect(result).toEqual(mockPalette.project)
      })
  
      it('fetchProjects should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchAddProject()).rejects.toEqual(Error('Cannot add project'))
      })
    })


    describe('fetchDeleteProject', () => {
      let mockPalette
      beforeEach( () => {
    
        mockPalette = {id: [{id: 1}]};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockPalette)
          })
        })
      });
    
      it('fetchDeleteProject should return a parsed response if status is ok', async () =>{
        const result = await fetchDeleteProject();
        fetchDeleteProject()
        expect(result).toEqual(mockPalette.project)
      })
  
      it('fetchDeleteProject should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchDeleteProject()).rejects.toEqual(Error('Cannot delete project'))
      })
    })

    describe('fetchPalettes', () => {
      let mockPalette
      beforeEach( () => {
    
        mockPalette = {palettes: [{name: 'palette'}]};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockPalette)
          })
        })
      });
    
      it('fetchPalettes should return a parsed response if status is ok', async () =>{
        const result = await fetchPalettes();
        fetchPalettes()
        expect(result).toEqual(mockPalette.palettes)
      })
  
      it('fetchPalettes should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchPalettes()).rejects.toEqual(Error('Cannot fetch palettes'))
      })
    })

    describe('fetchPalette', () => {
      let mockPalette
      beforeEach( () => {
    
        mockPalette = {name: 'palette'};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockPalette)
          })
        })
      });
    
      it('fetchPalette should return a parsed response if status is ok', async () =>{
        const result = await fetchPalette();
        expect(result).toEqual(mockPalette)
      })
  
      it('fetchPalette should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve({
            ok: false,
          })
        })
        expect(fetchPalette()).rejects.toEqual(Error('Cannot fetch palettes'))
      })
    });


    describe('fetchAddPalette', () => {
      let mockPalette
      beforeEach( () => {
    
        mockPalette = {palette: [{name: 'palette'}]};
    
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(mockPalette)
          })
        })
      });
    
      it('fetchAddPalette should return a parsed response if status is ok', async () =>{
        const result = await fetchAddPalette();
        fetchAddPalette()
        expect(result).toEqual(mockPalette.palette)
      })
  
      it('fetchProjects should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchAddPalette()).rejects.toEqual(Error('Cannot add palette'))
      })
    })

    describe('fetchPatchProject', () => {
      let updatedProject;

      beforeEach( () => {
        updatedProject = {name: 'beep'};
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(updatedProject)
          })
        })
      });
    
      it('fetchPatchProject should return a parsed response if status is ok', async () =>{
        const result = await fetchPatchProject();
        fetchPatchProject()
        expect(result).toEqual(updatedProject)
      })
  
      it('fetchPatchProject should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchPatchProject()).rejects.toEqual(Error('Cannot modify project'))
      })
    });

    describe('fetchPatchPalette', () => {
      let updatedPalette;

      beforeEach( () => {
        updatedPalette = {name: 'beep'};
        window.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve( {
            ok: true,
            json: () => Promise.resolve(updatedPalette)
          })
        })
      });
    
      it('fetchPatchPalette should return a parsed response if status is ok', async () =>{
        const result = await fetchPatchPalette();
        fetchPatchPalette()
        expect(result).toEqual(updatedPalette)
      })
  
      it('fetchPatchPalette should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchPatchPalette()).rejects.toEqual(Error('Cannot modify palette'))
      })
    })
})