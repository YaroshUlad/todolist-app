const initialState: InitialStateType = {
	status: 'idle',
	error: null,
	isInit: false
};

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status};
		case 'APP/SET-ERROR':
			return {...state, error: action.error};
		case 'app/SET-IS-INIT':
			return {
				...state, isInit: !state.isInit
			};
		default:
			return {...state};
	}
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	status: RequestStatusType
	error: string | null
	isInit: boolean
}

export const setAppErrorAC = (error: string | null) => ({
	type: 'APP/SET-ERROR',
	error
} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({
	type: 'APP/SET-STATUS',
	status
} as const);
export const setIsInitAC = () => {
	return {
		type: 'app/SET-IS-INIT'
	} as const;
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitAT = ReturnType<typeof setIsInitAC>

type ActionsType = SetIsInitAT | SetAppErrorActionType | SetAppStatusActionType
