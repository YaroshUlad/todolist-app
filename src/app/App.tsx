import React, { ReactElement, useEffect } from 'react';

import 'app/App.css';

import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStatusType } from 'app/app-reducer';
import { AppRootStateType } from 'app/store';
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';
import { Header } from 'components/Header/Header';
import { Router } from 'components/Router/Router';
import { initAppTC } from 'features/Login/auth-reducer';

const App = (): ReactElement => {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    state => state.app.status,
  );

  const isInit = useSelector<AppRootStateType, boolean>(state => state.app.isInit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppTC());
  }, [dispatch]);

  if (!isInit) {
    return (
      <div className="circularProgress">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      {status === 'loading' && (
        <div className="linearProgress">
          <LinearProgress />
        </div>
      )}
      <Header />
      <Router />
    </div>
  );
};

export default App;
