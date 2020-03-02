import {
	GET_USERS_SUCCESS,
	GET_USER_PLACES_SUCCESS,
	GET_USERS_START,
	GET_USER_PLACES_START,
	ADD_NEW_PLACE_START
} from '../types';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS_START:
		case GET_USER_PLACES_START:
		case ADD_NEW_PLACE_START:
			return { ...state, loading: true };

		case GET_USERS_SUCCESS:
			return {
				...state,
				users: payload,
				loading: false
			};

		case GET_USER_PLACES_SUCCESS:
			return {
				...state,
				places: payload
			};

		default:
			return state;
	}
};
