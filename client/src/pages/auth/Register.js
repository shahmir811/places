import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

import './Register.styles.scss';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { registerUser, errors, loading, clearErrors } = authContext;
	const { setAlert } = alertContext;

	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	useEffect(() => {
		clearErrors();
		// eslint-disable-next-line
	}, []);

	const { name, email, password, confirmPassword } = newUser;

	const onChangeHandler = e => {
		const { name, value } = e.target;
		setNewUser({ ...newUser, [name]: value });
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		if (newUser.password !== newUser.confirmPassword) {
			setAlert('danger', 'Password mismatch error');
			return false;
		}

		registerUser({ name, email, password });
	};

	return (
		<div>
			<Row>
				<Col>
					<h1 className='centered'>Register to our application</h1>
					<Form onSubmit={onSubmitHandler}>
						<Form.Group controlId='formBasicName'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								name='name'
								value={name}
								onChange={onChangeHandler}
								className={errors.name && 'invalid'}
							/>
							{errors.name && (
								<Form.Text className='text-muted show-error'>
									{errors.name.msg}
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								name='email'
								value={email}
								onChange={onChangeHandler}
								className={errors.email && 'invalid'}
							/>
							{errors.email && (
								<Form.Text className='text-muted show-error'>
									{errors.email.msg}
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder=''
								name='password'
								value={password}
								onChange={onChangeHandler}
								className={errors.password && 'invalid'}
							/>
							{errors.password && (
								<Form.Text className='text-muted show-error'>
									{errors.password.msg}
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group controlId='formBasicPasswordConfirmation'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								placeholder=''
								name='confirmPassword'
								value={confirmPassword}
								onChange={onChangeHandler}
							/>
						</Form.Group>

						<Button variant='primary' type='submit' disabled={loading}>
							{loading ? (
								<Spinner animation='border' variant='light' />
							) : (
								<span>Register</span>
							)}
						</Button>
					</Form>
					<Form.Text className='text-muted'>
						<Link to='/login'>Already have an account</Link>
					</Form.Text>
				</Col>
			</Row>
		</div>
	);
};

export default Register;
