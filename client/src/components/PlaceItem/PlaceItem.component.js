import React from 'react';
import renderHTML from 'react-render-html';
import { Media } from 'react-bootstrap';

const PlaceItem = props => {
	const { name, description, image_path } = props.place;
	return (
		<Media>
			<img
				width={100}
				height={70}
				className='mr-3'
				src={`http://localhost:5000/${image_path}`}
				alt='Generic placeholder'
			/>
			<Media.Body>
				<h5>{name}</h5>
				{renderHTML(description)}
			</Media.Body>
		</Media>
	);
};

export default PlaceItem;
