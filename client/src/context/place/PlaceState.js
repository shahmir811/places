import React, { useReducer } from 'react';
// import axios from 'axios';
import PlaceContext from './placeContext';
import PlaceReducer from './PlaceReducer';

import { GET_USERS_LIST, GET_USER_PLACES } from '../types';
import { DUMMY_USERS, DUMMY_PLACES } from './dummy-records';

const PlaceState = props => {
	const INITIAL_STATE = {
		users: [],
		places: []
	};

	const [state, dispatch] = useReducer(PlaceReducer, INITIAL_STATE);

	// Get users list
	const getUsersList = () => {
		dispatch({
			type: GET_USERS_LIST,
			payload: DUMMY_USERS
		});
	};

	const getUserPlaces = id => {
		const places = DUMMY_PLACES.filter(
			place => place.creator_id.toString() === id
		);
		dispatch({
			type: GET_USER_PLACES,
			payload: places
		});
	};

	return (
		<PlaceContext.Provider
			value={{
				users: state.users,
				places: state.places,
				getUsersList,
				getUserPlaces
			}}
		>
			{props.children}
		</PlaceContext.Provider>
	);
};

export default PlaceState;
