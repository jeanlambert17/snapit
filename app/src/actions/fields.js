import {
   UPDATE_FIELD_REQUEST,
   UPDATE_FIELD_SUCCESS,
   UPDATE_FIELD_FAILURE,
   UPDATE_PASSWORD_REQUEST,
   UPDATE_PASSWORD_SUCCESS,
   UPDATE_PASSWORD_FAILURE,
} from '../constants/fields';

import { setUser } from './auth';

import fetchUpdateField from '../api/updateField';

export function updateField(form) {
   const request = () => ({ type: UPDATE_FIELD_REQUEST });
   const success = (user) => ({ type: UPDATE_FIELD_SUCCESS, user: user });
   const failure = (error) => ({ type: UPDATE_FIELD_FAILURE, error });
   return async (dispatch, getState) => {
      dispatch(request())
      try {
         const { auth: { token } } = getState();         
         const user = await fetchUpdateField(form, token);
         console.log(user);
         if(user) {
            dispatch(success(user));
            dispatch(setUser(user));
         }
      } catch(err) {
         dispatch(failure(err));
         console.log('ERROR ON UPDATEFIELD: ')
         console.log(err);
      }
   }
}