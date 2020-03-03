import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import PlaceContext from '../../context/place/placeContext';
import AuthContext from '../../context/auth/authContext';

const AddNewPage = () => {
	const placeContext = useContext(PlaceContext);
	const authContext = useContext(AuthContext);

	const { addNewPlace, loading, uploadPercent } = placeContext;
	const { user } = authContext;

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const [placeImage, setPlaceImage] = useState('');
	const [previewImage, setPreviewImage] = useState(null);

	const onChangeFileInput = e => {
		setPlaceImage(e.target.files[0]);

		// preview upload image
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = event => {
			setPreviewImage(event.target.result);
		};
	};

	const onHandleEditorChange = e => {
		setDescription(e);
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		const data = new FormData();
		data.append('name', name);
		data.append('description', description);
		data.append('image', placeImage);

		addNewPlace(data, user.id);
	};

	return (
		<div>
			<h1 className='text-center'>Add new place</h1>
			<Row>
				<Col xs={12} md={8}>
					<Form onSubmit={onSubmitHandler}>
						<Form.Group controlId='formBasicName'>
							<Form.Label>Place:</Form.Label>
							<Form.Control
								type='text'
								placeholder='Place name'
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId='EditorID'>
							<Form.Label>Description:</Form.Label>
							<ReactQuill
								modules={AddNewPage.modules}
								formats={AddNewPage.formats}
								value={description}
								placeholder='Enter place description'
								onChange={onHandleEditorChange}
								theme='snow'
								style={{ height: '250px', marginBottom: '5rem' }}
							/>
						</Form.Group>

						<div className='form-group'>
							<div className='custom-file'>
								<input
									type='file'
									accept='image/*'
									className='custom-file-input'
									id='validatedCustomFile'
									name='placeImage'
									// value={placeImage}
									onChange={onChangeFileInput}
									required
								/>
								<label
									className='custom-file-label'
									htmlFor='validatedCustomFile'
								>
									Choose file...
								</label>
								<div className='invalid-feedback'>
									Example invalid custom file feedback
								</div>
							</div>
						</div>
						<Button variant='primary' type='submit' disabled={loading}>
							{loading ? (
								<Spinner animation='border' variant='light' />
							) : (
								<span>Save</span>
							)}
						</Button>
					</Form>
				</Col>
				<Col xs={6} md={4}>
					<h5 className='text-center'>Preview Uploaded Image</h5>
					{previewImage && (
						<img
							src={previewImage}
							alt='Preview'
							style={{ width: '75%', margin: '0 12%' }}
						/>
					)}
					<br />
					{uploadPercent > 0 && (
						<Alert variant='success'>Uploaded {uploadPercent}%</Alert>
					)}
				</Col>
			</Row>
		</div>
	);
};

AddNewPage.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
		['code-block']
	]
};

AddNewPage.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'link',
	'image',
	'video',
	'code-block'
];

export default AddNewPage;
