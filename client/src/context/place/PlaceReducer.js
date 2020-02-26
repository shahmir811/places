import { GET_USERS_LIST, GET_USER_PLACES } from '../types';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USERS_LIST:
			return {
				...state,
				users: payload
			};

		case GET_USER_PLACES:
			return {
				...state,
				places: payload
			};

		default:
			return state;
	}
};
