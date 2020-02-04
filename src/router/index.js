import React from 'react';
import { Route } from 'react-router-dom';
import RouteGuard from './routerGuard';

// Import View Here

import Dashboard from '../views/Dashboard';
import History from '../views/History';
import AddEntry from '../views/AddEntry';
import RegPage from '../views/RegPage';
import ChildPage from '../views/ChildPage';
import LoginPage from '../views/LoginPage';

export default function RouterView() {
	return (
		<div className="router-view">
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/history" component={History} />
			<Route exact path="/add" component={AddEntry} />
			<Route path="/login" component={LoginPage} />
			<Route path="/onboarding-1" component={RegPage} />
			<Route path="/childinfo" component={ChildPage} />
		</div>
	);
}
