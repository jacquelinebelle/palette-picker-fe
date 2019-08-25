import { getProjects } from '../api/apiCalls';


describe('apiCalls', () => {

  describe('getProjects', () => {
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
  
    it('getProjects should return a parsed response if status is ok', async () =>{
      const result = await getProjects();
      getProjects()
      expect(result).toEqual(mockProject.projects)
    })
  
    it('getProjects should return error if status is not ok', async () => {
      window.fetch = jest.fn().mockImplementationOnce(() => {
        return Promise.resolve( {
          ok: false,
        })
      })
      await expect(getProjects()).rejects.toEqual(Error('Cannot fetch projects'))
    })
  
    })
})