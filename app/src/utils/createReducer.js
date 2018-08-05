function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action)
    } else {
      return state
    }
  }
}

function createFetchPattern(_actionName, cb, _actionHandlers = {}) {
  const actionName = _actionName.toUpperCase();
  const actionRequest = actionName + '_REQUEST';
  const actionFailure = actionName + '_FAIULURE';
  const actionSuccess = actionName + '_SUCCESS';
  const initialState = {
    data: null,
    fetching: false,
    error: false,
    errorMessage: '',
  }
  const actionHandlers = {
    [actionRequest]: (state,action) => ({...state, fetching: true, error: false, errorMessage: null }),
    [actionFailure]: (state,action) => ({...state, fetching: false, error: true, errorMessage: action.error}),
    [actionSuccess]: (state,action) => ({...state, fetching: false, data: action.data}),
    ..._actionHandlers,
  }
  const action = (form = null) => {
    return async (dispatch, getState) => {
      dispatch({type: actionRequest});
      const { auth: { token }} = getState();
      if(token) {
        try {
          const data = form ? await cb(form, token) : await cb(token);
          dispatch({
            type: actionSuccess,
            data: data
          });
        } catch (err) {
          dispatch({
            type: actionFailure,
            error: err
          });
        }
      } else {
        try {
          const data = form ? await cb(form) : await cb();
          dispatch({
            type: actionSuccess,
            data: data
          });
        } catch (err) {
          dispatch({
            type: actionFailure,
            error: err
          });
        }
      }
    }
  }

  return {
    reducer: createReducer(initialState, actionHandlers),
    action: action,
  }
}

export { createReducer, createFetchPattern }