import React from 'react';
import { shallow } from 'enzyme';
import { App , mapDispatchToProps, mapStateToProps} from './App';
import { setProjects, projectSelected, setPalettes } from '../../actions';
import { fetchProjects } from '../../api/apiCalls';


describe('App', () => {
  let wrapper;
  let props;
  let mockColors
  beforeEach(() => {
     mockColors = ["#000000"];
     props = {
      handleSetProjects: jest.fn(),
      handleProjectSelected: jest.fn(),
      handleFetchPalettes: jest.fn()
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

  it('getUpdatedProject should call handleSetProject', () => {
    wrapper.instance().getUpdatedProject = jest.fn();
    wrapper.instance().getUpdatedProject();
    wrapper.instance().forceUpdate();
    expect(props.handleSetProjects).toHaveBeenCalled();
  })


//////////////////


it.skip('addAndUpdatePalette should call getPalettes', () => {
  const spy = jest.spyOn(wrapper.instance(), "getPalettes");
  wrapper.instance().forceUpdate();
  // wrapper.find('.project-name').prop('onClick')()
  wrapper.instance().addAndUpdatePalette = jest.fn();
  wrapper.instance().addAndUpdatePalette();
  expect(spy).toHaveBeenCalled();

  // wrapper.instance().addAndUpdatePalette = jest.fn();
  // wrapper.instance().addAndUpdatePalette();
  // expect(wrapper.instance().getPalettes).toHaveBeenCalled()
})

  it.skip('getPalettes should call handleProjectSelected and handleFetchPalettes', () => {
  
    wrapper.instance().getUpdatedProject = jest.fn();
    wrapper.instance().getUpdatedProject();

    // wrapper.instance().getPalettes = jest.fn();
    // wrapper.instance().getPalettes();
    expect(props.handleFetchPalettes).toHaveBeenCalled()
  })

  it('should dispatch with a setProject action when handleSetProjects is called', async () => {
    const mockDispatch = jest.fn()
    const mockAction = setProjects(await fetchProjects())
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