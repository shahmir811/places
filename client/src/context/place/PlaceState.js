import React, { useReducer } from 'react';
import axios from 'axios';
import PlaceContext from './placeContext';
import PlaceReducer from './PlaceReducer';

import {
	GET_USERS_START,
	GET_USERS_SUCCESS,
	GET_USER_PLACES_START,
	GET_USER_PLACES_SUCCESS
} from '../types';

const PlaceState = props => {
	const INITIAL_STATE = {
		users: [],
		places: [],
		loading: false,
		errors: {}
	};

	const [state, dispatch] = useReducer(PlaceReducer, INITIAL_STATE);

	// Get users list
	const getUsersList = async () => {
		dispatch({ type: GET_USERS_START });

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const response = await axios.get('/api/users', config);

			dispatch({
				type: GET_USERS_SUCCESS,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getUserPlaces = async id => {
		dispatch({
			type: GET_USER_PLACES_START
		});

		try {
			const response = await axios.get(`/api/users/${id}/places`);

			dispatch({
				type: GET_USER_PLACES_SUCCESS,
				payload: response.data
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<PlaceContext.Provider
			value={{
				users: state.users,
				places: state.places,
				loading: state.loading,
				getUsersList,
				getUserPlaces
			}}
		>
			{props.children}
		</PlaceContext.Provider>
	);
};

export default PlaceState;
