import {Dispatch} from 'redux';
import {
	SetAppErrorActionType,
	setAppStatusAC,
	SetAppStatusActionType,
	setIsInitAC
} from '../../app/app-reducer';
import {authAPI} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


type UserInfoType = {
	id?: number | null
	login?: string | null
	email?: string | null
}

const initialState = {
	isLoggedIn: false
};
type InitialStateType = UserInfoType & typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.value};
		case 'login/SET-USER-INFO':
			return {
				...state,
				...action.payload
			};
		case 'login/SET-LOG-OUT-FROM-APP':
			return {
				...initialState
			};
		default:
			return state;
	}
};

//_______________ ActionCreators________________

export const setIsLoggedInAC = (value: boolean) => {
	return {
		type: 'login/SET-IS-LOGGED-IN',
		value
	} as const;
};
export const setUserInfoAC = (id: number, login: string, email: string) => {
	return {
		type: 'login/SET-USER-INFO',
		payload: {
			id, login, email
		}
	} as const;
};

export const setLoggedOutAC = () => {
	return {
		type: 'login/SET-LOG-OUT-FROM-APP'
	} as const;
};

// _____________________Thunks _____________________________

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'));
	authAPI.login({email, password, rememberMe})
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				handleServerAppError(res.data, dispatch);
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch);
		});
};

export const initAppTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'));
	authAPI.authMe()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true));
				dispatch(setUserInfoAC(res.data.data.id, res.data.data.login, res.data.data.email));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				handleServerAppError(res.data, dispatch);
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch);
		})
		.finally(() => {
			dispatch(setIsInitAC());
		});
};

export const logoutTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'));
	authAPI.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false));
				dispatch(setAppStatusAC('succeeded'));
			} else {
				handleServerAppError(res.data, dispatch);
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch);
		});
};


//___________________Types_____________________________

export type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
export type setUserInfoAT = ReturnType<typeof setUserInfoAC>
export type setLoggedOutAT = ReturnType<typeof setLoggedOutAC>
type ActionsType =
	setLoggedOutAT
	| setUserInfoAT
	| setIsLoggedInAT
	| SetAppStatusActionType
	| SetAppErrorActionType