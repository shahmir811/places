import React from 'react';

import CardItem from '../CardItem/CardItem.component';
import './CardList.styles.scss';

const CardList = ({ users }) => {
	if (users.length === 0) {
		return <h2>No more users</h2>;
	}

	return users.map(user => <CardItem key={user.id} {...user} />);
};

export default CardList;
