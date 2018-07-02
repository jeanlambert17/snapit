import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// let store = createStore(reducers, applyMiddleware(thunk));

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
