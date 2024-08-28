import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/provider';
import { clearNotesLogout } from '../journal';
import {
  checkingCredentials,
  finishLoading,
  login,
  logout,
  startLoading,
} from './';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    dispatch(startLoading());

    const result = await signInWithGoogle();

    dispatch(finishLoading());

    if (!result.ok) {
      return dispatch(logout({ ...result }));
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    dispatch(startLoading());

    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailPassword({
        email,
        password,
      });

    dispatch(finishLoading());

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ email, uid, photoURL, displayName }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(clearNotesLogout());
    dispatch(logout({ errorMessage: null }));
  };
};
