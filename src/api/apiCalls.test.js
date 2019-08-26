import { fetchProjects, fetchAddProject, fetchDeleteProject, fetchPalettes, fetchAddPalette} from '../api/apiCalls';


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
        fetchProjects()
        expect(result).toEqual(mockProject.projects)
      })
  
      it('fetchProjects should return error if status is not ok', async () => {
        window.fetch = jest.fn().mockImplementationOnce(() => {
          return Promise.resolve( {
            ok: false,
          })
        })
        await expect(fetchProjects()).rejects.toEqual(Error('Cannot fetch projects'))
      })
    })

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
        await expect(fetchPalettes()).resolves.toEqual('Cannot fetch palettes')
      })
    })


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
})