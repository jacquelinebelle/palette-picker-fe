import React from 'react'
import rootReducer from '../src/reducers'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App/App';
import 'normalize.css';
import './index.scss';
export const store = createStore(rootReducer, composeWithDevTools());

render(
    <Provider store={ store } >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)