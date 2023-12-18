// @packages
import React from 'react';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
// @scripts
import LocationsNavigator from './navigation/LocationsNavigator';
import locationsReducer from './store/reducers/locations-reducer';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Initialized Database');
  })
  .catch((err) => {
    console.log('FAIL: Initialize Database');
    console.log(err);
  });

const rootReducer = combineReducers({
  locations: locationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <LocationsNavigator />
    </Provider>
  );
}
