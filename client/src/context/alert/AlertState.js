import React, { useReducer } from 'react';

import AlertContext from './alertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
	const INITIAL_STATE = {
		type: 'success',
		message: null
	};

	const [state, dispatch] = useReducer(AlertReducer, INITIAL_STATE);

	const setAlert = (type, message) => {
		dispatch({
			type: SET_ALERT,
			payload: {
				type,
				message
			}
		});
	};

	const removeAlert = () => {
		dispatch({
			type: REMOVE_ALERT
		});
	};

	return (
		<AlertContext.Provider
			value={{
				alert: state,
				setAlert,
				removeAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
