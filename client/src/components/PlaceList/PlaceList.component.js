import React from 'react';

import PlaceItem from '../PlaceItem/PlaceItem.component';

const PlaceList = ({ places }) => {
	return places.map(place => <PlaceItem key={place.id} place={place} />);
};

export default PlaceList;
