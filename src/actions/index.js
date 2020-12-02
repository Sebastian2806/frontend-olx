import axios from 'axios';
import { AUTH_SUCCESS, AUTH_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

export const signupAction = (email, password, repeatedPassword, setErrors) => async (dispatch) => {
  try {
    const payload = await axios.put('http://localhost:8080/signup', {
      email,
      password,
      repeatedPassword,
    });
    dispatch({ type: SIGNUP_SUCCESS, payload });
  } catch (err) {
    const payload = {
      errors: err.response.data.errors
        ? err.response.data.errors
        : [
            {
              param: 'email',
              msg: 'Błąd serwera!',
            },
          ],
    };
    const errorsObj = {};
    payload.errors.forEach((el) => (errorsObj[el.param] = el.msg));
    setErrors(errorsObj);
    dispatch({ type: SIGNUP_FAIL, payload });
  }
};

export const authenticateAction = (email, password, setErrors) => async (dispatch) => {
  try {
    const payload = await axios.post('http://localhost:8080/signin', {
      email,
      password,
    });
    localStorage.setItem('token', payload.data.token);
    localStorage.setItem('user_id', payload.data.user_id);
    dispatch({ type: AUTH_SUCCESS, payload: payload.data });
  } catch (err) {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setErrors({ email: 'Niepoprawny email lub hasło' });
    dispatch({ type: AUTH_FAIL, payload: { message: 'Niepoprawny email lub hasło' } });
  }
};
