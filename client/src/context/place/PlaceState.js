import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PlaceContext from './placeContext';
import PlaceReducer from './PlaceReducer';

import AlertContext from '../alert/alertContext';
// import AuthContext from '../auth/authContext';

import {
	GET_USERS_START,
	GET_USERS_SUCCESS,
	GET_USER_PLACES_START,
	GET_USER_PLACES_SUCCESS,
	ADD_NEW_PLACE_START,
	ADD_NEW_PLACE_SUCCESS,
	ADD_NEW_PLACE_FAIL,
	UPLOAD_PLACE_PROGRESS,
	REMOVE_PLACE,
	UPDATE_IMAGE_START,
	UPDATE_IMAGE_SUCCESS,
	UPDATE_IMAGE_FAIL
} from '../types';

const PlaceState = props => {
	const INITIAL_STATE = {
		users: [],
		places: [],
		loading: false,
		errors: {},
		uploadPercent: 0
	};

	const [state, dispatch] = useReducer(PlaceReducer, INITIAL_STATE);

	const alertContext = useContext(AlertContext);
	// const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;

	//////////////////////// Get users list ////////////////////////
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

	//////////////////////// Get places list ////////////////////////
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
			setAlert('danger', 'OOPS! Something went wrong');
			console.log(error);
		}
	};

	//////////////////////// Add new place ////////////////////////
	const addNewPlace = async (newPlace, id) => {
		dispatch({ type: ADD_NEW_PLACE_START });

		const config = {
			onUploadProgress: progressEvent => {
				let percent = (
					(progressEvent.loaded / progressEvent.total) *
					100
				).toFixed(2);
				dispatch({
					type: UPLOAD_PLACE_PROGRESS,
					payload: percent
				});
				console.log(percent + '%');
			}
		};

		try {
			await axios.post(`/api/places/${id}`, newPlace, config);
			dispatch({ type: ADD_NEW_PLACE_SUCCESS });
			setAlert('success', 'New place added successfully');
			props.history.push(`${id}/places`);
		} catch (error) {
			dispatch({ type: ADD_NEW_PLACE_FAIL });
			setAlert('danger', 'OOPS! Something went wrong');
			console.log(error);
		}
	};

	//////////////////////// Update Places ////////////////////////
	const updatePlace = async (updatedPlace, id, userId) => {
		// console.log('ID: ', id);
		// console.log('UserId: ', userId);
		dispatch({
			type: UPDATE_IMAGE_START
		});

		const config = {
			onUploadProgress: progressEvent => {
				let percent = (
					(progressEvent.loaded / progressEvent.total) *
					100
				).toFixed(2);
				dispatch({
					type: UPLOAD_PLACE_PROGRESS,
					payload: percent
				});
				console.log(percent + '%');
			}
		};

		try {
			await axios.put(`/api/places/${id}`, updatedPlace, config);
			dispatch({ type: UPDATE_IMAGE_SUCCESS });
			setAlert('success', 'Record updated successfully');
			props.history.push(`/${userId}/places`);
		} catch (error) {
			dispatch({ type: UPDATE_IMAGE_FAIL });
			setAlert('danger', 'OOPS! Something went wrong');
			console.log(error);
		}
	};

	//////////////////////// Remove place ////////////////////////
	const removePlace = async id => {
		try {
			await axios.delete(`/api/places/${id}`);
			dispatch({
				type: REMOVE_PLACE,
				payload: id
			});
			setAlert('success', 'Place deleted successfully');
		} catch (error) {
			setAlert('danger', 'OOPS! Something went wrong, try again');
			console.log(error);
		}
	};

	return (
		<PlaceContext.Provider
			value={{
				users: state.users,
				places: state.places,
				loading: state.loading,
				uploadPercent: state.uploadPercent,
				getUsersList,
				getUserPlaces,
				addNewPlace,
				removePlace,
				updatePlace
			}}
		>
			{props.children}
		</PlaceContext.Provider>
	);
};

export default withRouter(PlaceState);
