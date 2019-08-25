import React from 'react';
import { shallow } from 'enzyme';
import { App , mapDispatchToProps, mapStateToProps} from './App';
import { setProjects, projectSelected, setPalettes } from '../../actions';
import { getProjects } from '../../api/apiCalls';


describe('App', () => {
  let wrapper;
  let props;
  let mockColors
  beforeEach(() => {
     mockColors = ["#000000"];
     props = {
      handleSetProjects: jest.fn(),
      handleProjectSelected: jest.fn()
    }
    wrapper = shallow(<App colors={mockColors} {...props}/>);
  })


  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSetProject when component mounts', () => {
    expect(props.handleSetProjects).toHaveBeenCalledTimes(1)
    wrapper.instance().componentDidMount();
    expect(props.handleSetProjects).toHaveBeenCalledTimes(2)
  });

  it('getUpdatedProject should clal handleSetProject', () => {
    wrapper.instance().getUpdatedProject = jest.fn()
    wrapper.instance().getUpdatedProject();
    expect(props.handleSetProjects).toHaveBeenCalled()
  })

  // it.skip('addPalette should call fetchAddPalette', () => {
  //   wrapper.instance().addPalette = jest.fn();

  //   wrapper.instance().addPalette();
  //   expect(wrapper.instance().fetchAddPalette).toHaveBeenCalled()
  // })

  // it('getPalettes should setState currentProject', () => {
  //     wrapper.instance().setState({currentProject: 0})
  //     const expectedCurrentProject = 0
  //     expect(wrapper.state().currentProject).toEqual(expectedCurrentProject)
  //     wrapper.instance().getPalettes(1)
  //     const expectedCurrentProjectAfterReset = 1
  //     expect(wrapper.state().currentProject).toEqual(expectedCurrentProjectAfterReset)

  //     wrapper.instance().handleFetchPalettes = jest.fn();
  //     expect(wrapper.instance().handleFetchPalettes).toHaveBeenCalled();

  // })









  it('should dispatch with a setProject action when handleSetProjects is called', async () => {
    const mockDispatch = jest.fn()
    const mockAction = setProjects(await getProjects())
    const mappedProps = mapDispatchToProps(mockDispatch)
    await mappedProps.handleSetProjects()
    expect(mockDispatch).toHaveBeenCalledWith(mockAction) 
  })

  it('should dispatch with a projectSelected action when handleProjectSelected is called', () => {
    const mockDispatch = jest.fn();
    const mockSelected = 1;
    const mockAction = projectSelected(mockSelected);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleProjectSelected(mockSelected);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  })

  it('should dispatch with a setPalettes action when handleSetPalettes is called', () => {
    const mockDispatch = jest.fn();
    const mockSelected = [{name: 'palette'}];
    const mockAction = setPalettes(mockSelected);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleSetPalettes(mockSelected);
    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  })

  it('should return an array of colors', () => {
    const mockState = {
      colors: ["#000000"],
    }
    const expected = {
      colors: ["#000000"],
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

  it('should return selected project', () => {
    const mockState = {
      selectedProject: 1,
    }
    const expected = {
      selectedProject: 1,
    }
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  });

});