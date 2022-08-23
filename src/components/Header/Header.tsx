import React, { memo } from 'react';

import { Menu } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch, useSelector } from 'react-redux';

import { AppRootStateType } from 'app/store';
import { logoutTC } from 'features/Login/auth-reducer';

export const Header = memo(() => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );

  const logout = (): void => {
    dispatch(logoutTC());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        {isLoggedIn && (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});
