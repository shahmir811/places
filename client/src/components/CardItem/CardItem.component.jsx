import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './CardItem.styles.scss';

const CardItem = ({ id, name, image }) => {
	return (
		<Card>
			<Card.Img variant='top' src={image} className='make-small-round-img' />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make up the
					bulk of the card's content.
				</Card.Text>
				<Link to={`${id}/places`} className='btn btn-primary'>
					Check places
				</Link>
			</Card.Body>
		</Card>
	);
};

export default CardItem;
