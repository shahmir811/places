import React, { useContext, Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './NavigationBar.styles.scss';

import AuthContext from '../../context/auth/authContext';

const NavigationBar = props => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user, logout } = authContext;

	const RenderLinks = () => {
		if (isAuthenticated) {
			return (
				<Fragment>
					<NavLink to='/add-new-place' className='nav-link white-text'>
						Add New
					</NavLink>
					<NavDropdown
						title={`Welcome ${user.name}`}
						id='basic-nav-dropdown'
						className=''
					>
						<NavDropdown.Item href='#action/3.1'>My Profile</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#' onClick={() => logout()}>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<NavLink to='/login' className='nav-link white-text'>
						Login
					</NavLink>
					<NavLink to='/register' className='nav-link white-text'>
						Register
					</NavLink>
				</Fragment>
			);
		}
	};

	return (
		<Navbar expand='lg' bg='dark' className='space-below'>
			<NavLink to='/' className='navbar-brand white-text'>
				Places
			</NavLink>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<NavLink to='/' className='nav-link white-text'>
						Home
					</NavLink>
					<NavLink to='/my-places' className='nav-link white-text'>
						Places
					</NavLink>
					{RenderLinks()}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavigationBar;
