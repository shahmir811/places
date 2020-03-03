import {
	GET_USERS_SUCCESS,
	GET_USER_PLACES_SUCCESS,
	GET_USERS_START,
	GET_USER_PLACES_START,
	ADD_NEW_PLACE_START,
	ADD_NEW_PLACE_SUCCESS,
	ADD_NEW_PLACE_FAIL,
	UPLOAD_PLACE_PROGRESS
} from '../types';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS_START:
		case GET_USER_PLACES_START:
		case ADD_NEW_PLACE_START:
		case ADD_NEW_PLACE_SUCCESS:
		case ADD_NEW_PLACE_FAIL:
			return { ...state, loading: true, uploadPercent: 0 };

		case GET_USERS_SUCCESS:
			return {
				...state,
				users: payload,
				loading: false
			};

		case UPLOAD_PLACE_PROGRESS:
			return {
				...state,
				uploadPercent: payload
			};

		case GET_USER_PLACES_SUCCESS:
			return {
				...state,
				places: payload,
				loading: false
			};

		default:
			return state;
	}
};
