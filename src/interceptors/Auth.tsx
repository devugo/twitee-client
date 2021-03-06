import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import PageLoader from '../components/PageLoader';
import { STORAGE_VARIABLE } from '../constants/STORAGE_VARIABLE';
import { getLoader } from '../helpers/functions/getLoader';
import { deleteFromStorage, retrieveFromStorage } from '../helpers/functions/localStorage';
import { keepUserLoggedIn } from '../store/actions/auth';
import { KEEP_AUTH_USER } from '../store/actions/types';
import { RootStateType } from '../types.d';

function Auth({ component: Component, isAuth, ...rest }: any) {
  const [mount, setMount] = useState(false);
  const dispatch = useDispatch();
  const { auth, loader } = useSelector((state: RootStateType) => state);

  const { successData, errorData } = getLoader(loader, KEEP_AUTH_USER);
  const token = retrieveFromStorage(STORAGE_VARIABLE.token);

  useEffect(() => {
    if (!auth.loggedIn) {
      if (token) {
        dispatch(keepUserLoggedIn());
      } else {
        setMount(true);
      }
    } else {
      setMount(true);
    }
  }, []);

  useEffect(() => {
    if (successData?.response?.status == 200) {
      setMount(true);
    }
    if (errorData?.response?.status == 401 || errorData?.response?.status == 403) {
      deleteFromStorage(STORAGE_VARIABLE.token);
      setMount(true);
    }
  }, [successData, errorData]);

  if (isAuth) {
    return (
      <Route
        {...rest}
        render={(props) =>
          mount ? auth.loggedIn ? <Component {...props} /> : <Redirect to="/" /> : <PageLoader />
        }
      />
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        mount ? (
          auth.loggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          )
        ) : (
          <PageLoader />
        )
      }
    />
  );
}

export default Auth;
