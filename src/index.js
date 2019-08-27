import React from 'react'
import rootReducer from '../src/reducers'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App/App';
import thunk from 'redux-thunk';
import 'normalize.css';
import './index.scss';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
    <Provider store={ store } >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)