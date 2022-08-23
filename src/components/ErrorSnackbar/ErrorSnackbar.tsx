import React, { ReactElement } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import { setAppErrorAC } from 'app/app-reducer';
import { AppRootStateType } from 'app/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = (): ReactElement => {
  const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent<any> | Event,
    reason?: SnackbarCloseReason,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
