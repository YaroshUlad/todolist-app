import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';

import {AppRootStateType} from '../../app/store';
import {logoutTC} from '../../features/Login/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';

export const Header = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

	const logout = () => {
		dispatch(logoutTC());
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<Menu/>
				</IconButton>
				{isLoggedIn && <Button onClick={logout} color="inherit">Logout</Button>}
			</Toolbar>
		</AppBar>
	);
};
