import React, {useEffect} from 'react';

import './App.css';

import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';

import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {initAppTC} from '../features/Login/auth-reducer';
import CircularProgress from '@mui/material/CircularProgress';

import {Header} from '../components/Header/Header';
import {Router} from '../components/Router/Router';


function App() {
	const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);

	const isInit = useSelector<AppRootStateType, boolean>(state => state.app.isInit);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initAppTC());
	}, [dispatch]);


	if ( !isInit) {
		return <div className="circularProgress">
			<CircularProgress/>
		</div>;
	}

	return (
		<div className="App">
			<ErrorSnackbar/>
			{status === 'loading' && <div className="linearProgress"><LinearProgress/></div>}
			<Header/>
			<Router/>
		</div>
	);
}

export default App;
