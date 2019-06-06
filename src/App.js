import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

// import { Provider } from 'react-redux';
// import store from './store';

import Home from './components/Home';
import Header from './components/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login.js';

class App extends Component {
	render() {
		return (
			// <Provider store={store}>
				<HashRouter>
					<Header />
					<Route path="/" exact={true} component={Home} />
					<Route path="/register" exact={true} component={Register} />
					<Route path="/login" exact={true} component={Login} />
				</HashRouter>
			// </Provider>
		);
	}
}

export default App;