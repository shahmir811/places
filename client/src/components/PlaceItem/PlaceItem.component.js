import React from 'react';
import { Media } from 'react-bootstrap';

const PlaceItem = props => {
	const { name, description, image } = props.place;
	return (
		<Media>
			<img
				width={100}
				height={70}
				className='mr-3'
				src={`${image}`}
				alt='Generic placeholder'
			/>
			<Media.Body>
				<h5>{name}</h5>
				<p>{description}</p>
			</Media.Body>
		</Media>
	);
};

export default PlaceItem;
