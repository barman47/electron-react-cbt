import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

// import { Provider } from 'react-redux';
// import store from './store';

import Home from './components/Home';
import Header from './components/Header';
import Register from './components/auth/Register';

class App extends Component {
	render() {
		return (
			// <Provider store={store}>
				<HashRouter>
					<Header />
					<Route path="/" exact={true} component={Home} />
					<Route path="/register" exact={true} component={Register} />
				</HashRouter>
			// </Provider>
		);
	}
}

export default App;