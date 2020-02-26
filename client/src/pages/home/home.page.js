import React, { useContext, Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import CardList from '../../components/CardList/CardList.component';
import PlaceContext from '../../context/place/placeContext';
import AuthContext from '../../context/auth/authContext';

const HomePage = () => {
	// Initialize PlaceContext
	const placeContext = useContext(PlaceContext);
	const authContext = useContext(AuthContext);

	const { getUsersList, users } = placeContext;
	const { loadUser } = authContext;

	useEffect(() => {
		loadUser();
		getUsersList();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<Row>
				<Col>
					<CardList users={users} />
				</Col>
			</Row>
		</Fragment>
	);
};

export default HomePage;
