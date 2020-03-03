import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PlaceList from '../../components/PlaceList/PlaceList.component';
import PlaceContext from '../../context/place/placeContext';

const MyPlacesPage = () => {
	const placeContext = useContext(PlaceContext);

	const { getUserPlaces, places, loading } = placeContext;

	const { id } = useParams();

	useEffect(() => {
		getUserPlaces(id);
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spinner animation='border' variant='primary' />;
	} else {
		if (places.length === 0) {
			return <h2>No place added by this user</h2>;
		} else {
			return <PlaceList places={places} />;
		}
	}
};

export default MyPlacesPage;
