import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
	const authContext = useContext(AuthContext);

	const { login, errors, loading, clearErrors } = authContext;

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	useEffect(() => {
		clearErrors();
		// eslint-disable-next-line
	}, []);

	const { email, password } = user;

	const onChangeHandler = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const onSubmitHandler = e => {
		e.preventDefault();

		login(user);

		// setUser({
		// 	email: '',
		// 	password: ''
		// });
	};

	return (
		<div>
			<Row>
				<Col>
					<h1 className='centered'>Login</h1>
					<Form onSubmit={onSubmitHandler}>
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
								placeholder='Password'
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
						<Form.Group controlId='formBasicCheckbox'>
							<Form.Check type='checkbox' label='Check me out' />
						</Form.Group>
						<Button variant='primary' type='submit' disabled={loading}>
							{loading ? (
								<Spinner animation='border' variant='light' />
							) : (
								<span>Login</span>
							)}
						</Button>
					</Form>
					<Form.Text className='text-muted'>
						<Link to='/register'>Don't have any account</Link>
					</Form.Text>
				</Col>
			</Row>
		</div>
	);
};

export default Login;
