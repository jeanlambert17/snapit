import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

let store = createStore(reducers, applyMiddleware(thunk));

const _App = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

it('renders without crashing', () => {
  const rendered = renderer.create().toJSON();
  expect(rendered).toBeTruthy();
});
