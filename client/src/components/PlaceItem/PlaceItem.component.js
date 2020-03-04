import React, { useContext, Fragment, useState } from 'react';
import renderHTML from 'react-render-html';
import { Media, Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

import AuthContext from '../../context/auth/authContext';
import PlaceContext from '../../context/place/placeContext';

const PlaceItem = props => {
	const authContext = useContext(AuthContext);
	const placeContext = useContext(PlaceContext);

	const { user } = authContext;
	const { removePlace } = placeContext;

	const [show, setShow] = useState(false);

	const { id, name, description, image_path, UserId } = props.place;

	const deleteButtonHandler = () => {
		removePlace(id);
		setShow(false);
	};

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
			{user && user.id === UserId && (
				<Fragment>
					<Button className='btn btn-sm btn-primary'>Edit</Button>
					<Button
						className='btn btn-sm btn-danger'
						style={{ marginLeft: '5px' }}
						onClick={() => setShow(true)}
					>
						Delete
					</Button>
					{show && (
						<SweetAlert
							warning
							showCancel
							confirmBtnText='Yes, delete it!'
							confirmBtnBsStyle='danger'
							title='Are you sure?'
							onConfirm={() => deleteButtonHandler()}
							onCancel={() => setShow(false)}
							focusCancelBtn
						>
							You will not be able to recover this record!
						</SweetAlert>
					)}
				</Fragment>
			)}
		</Media>
	);
};

export default PlaceItem;
