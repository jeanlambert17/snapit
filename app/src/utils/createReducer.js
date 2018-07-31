function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action)
    } else {
      return state
    }
  }
}

function createFetchPattern(_actionName, _actionHandlers, cb) {
  const actionName = _actionName.toUpperCase();
  const actionRequest = actionName + '_REQUEST';
  const actionFailure = actionName + '_FAIULURE';
  const actionSuccess = actionName + '_SUCCESS';
  const initialState = {
    data: null,
    fetching: false,
    error: false,
    errorMessage: null,
  }
  const actionHandlers = {
    [actionRequest]: (state,action) => ({...state, fetching: true}),
    [actionFailure]: (state,action) => ({...state, fetching: false, error: true, errorMessage: action.errror}),
    [actionSuccess]: (state,action) => ({...state, fetching: false, data: action.data}),
    ..._actionHandlers,
  }
  const action = (form = null, auth = false) => {
    return (dispatch)=> {
      dispatch({type: actionRequest});
      try {
        const data = form ? await cb(form) : await cb();
        dispatch({
          type: actionSuccess, 
          data: data
        });        
      } catch(err) {
        dispatch({
          type: actionFailure, 
          error: err
        });
      }
    }
  }

  return {
    reducer: createReducer(initialState, actionHandlers),
    action: action,
  }
}