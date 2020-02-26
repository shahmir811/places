import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import _ from 'lodash';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';
import { withRouter } from 'react-router-dom';
import SetAuthToken from '../../utils/SetAuthToken';

import {
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_START,
	LOGOUT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	REMOVE_ERRORS,
	REGISTER_START
} from '../types';

import AlertContext from '../alert/alertContext';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: false,
		user: null,
		errors: {}
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	///////////////////////// Load login user /////////////////////////
	const loadUser = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			SetAuthToken(token);
		}

		try {
			const response = await axios.get('/api/auth/me');

			dispatch({
				type: USER_LOADED,
				payload: response.data
			});
		} catch (error) {
			dispatch({
				type: AUTH_ERROR,
				payload: error.response.data.msg
			});
		}
	};

	///////////////////////// Login User /////////////////////////
	const login = async user => {
		dispatch({
			type: REMOVE_ERRORS
		});
		dispatch({
			type: LOGIN_START
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const response = await axios.post('/api/auth/login', user, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data
			});

			setAlert('success', 'Login successfully');
			props.history.push('/');
		} catch (error) {
			const comingErrors = _.mapKeys(error.response.data.errors, 'param');

			setAlert('danger', 'OOPS! Something went wrong');
			dispatch({
				type: LOGIN_FAIL,
				payload: comingErrors
			});
		}
	};

	///////////////////////// Register User /////////////////////////
	const registerUser = async newUser => {
		dispatch({
			type: REMOVE_ERRORS
		});
		dispatch({
			type: REGISTER_START
		});

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			await axios.post('/api/auth/register', newUser, config);
			dispatch({
				type: REGISTER_SUCCESS
			});

			setAlert('success', 'New user registered successfully');
			props.history.push('/login');
		} catch (error) {
			const comingErrors = _.mapKeys(error.response.data.errors, 'param');

			setAlert('danger', 'OOPS! Something went wrong');
			dispatch({
				type: REGISTER_FAIL,
				payload: comingErrors
			});
		}
	};

	/////////////////// Logout user ////////////////////////////
	const logout = () => {
		setAlert('success', 'Logout successfully');
		dispatch({ type: LOGOUT });
	};

	///////////////////////// Clear Errors /////////////////////////
	const clearErrors = () => {
		dispatch({
			type: REMOVE_ERRORS
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				errors: state.errors,
				loadUser,
				login,
				registerUser,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default withRouter(AuthState);
