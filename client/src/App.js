import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import MyPlaces from './pages/my-places/my-places.page';
import AddNewPlace from './pages/add-new/add-new.page';
import EditPlace from './pages/edit-place/edit-place.page';
import NotFoundPage from './pages/not-found/not-found.page';
import Layout from './components/Layout/Layout';
import NavigationBar from './components/NavigationBar/NavigationBar';
import AlertMessages from './components/AlertMessages/AlertMessages.component';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import PlaceState from './context/place/PlaceState';
import AlertState from './context/alert/AlertState';
import SetAuthToken from './utils/SetAuthToken';

import './App.css';

const token = localStorage.getItem('token');
if (token) {
	SetAuthToken(token);
}

const App = () => {
	return (
		<Fragment>
			<Router>
				<AlertState>
					<AuthState>
						<PlaceState>
							<NavigationBar />
							<Layout>
								<AlertMessages />
								<Switch>
									<Route path='/' component={HomePage} exact />
									<Route path='/:id/places' component={MyPlaces} exact />
									<PrivateRoute
										path='/add-new-place'
										component={AddNewPlace}
										exact
									/>
									<PrivateRoute
										path='/edit-place/:id'
										component={EditPlace}
										exact
									/>
									<Route path='/login' component={Login} />
									<Route path='/register' component={Register} />
									<Route component={NotFoundPage} />
								</Switch>
							</Layout>
						</PlaceState>
					</AuthState>
				</AlertState>
			</Router>
		</Fragment>
	);
};

export default App;
