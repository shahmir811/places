import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';

import AlertContext from '../../context/alert/alertContext';

const AlertMessages = props => {
	const alertContext = useContext(AlertContext);
	const { alert, removeAlert } = alertContext;

	if (alert.message) {
		return (
			<Alert
				variant={`${alert.type}`}
				onClose={() => removeAlert()}
				dismissible
			>
				<p>{alert.message}</p>
			</Alert>
		);
	}
	return null;
};

export default AlertMessages;
