import {
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_START,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	REMOVE_ERRORS,
	REGISTER_START,
	REGISTER_END,
	LOGOUT
} from '../types';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			return { ...state, errors: {}, loading: false };

		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, error: {}, loading: false };

		case USER_LOADED:
			return {
				...state,
				error: {},
				loading: false,
				user: payload,
				isAuthenticated: true
			};

		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				errors: payload,
				loading: false,
				token: null,
				isAuthenticated: false,
				user: null
			};

		case REMOVE_ERRORS:
			return { ...state, errors: {} };

		case REGISTER_START:
		case LOGIN_START:
			return { ...state, loading: true };

		case REGISTER_END:
			return { ...state, loading: false };

		default:
			return state;
	}
};
