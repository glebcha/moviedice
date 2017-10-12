import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import Home from './app/screens/Home';
import About from './app/screens/About';
import Filters from './app/screens/Filters';
import Favorites from './app/screens/Favorites';

const store = configureStore();

const Navigator = StackNavigator({
	Home: { screen: Home },
	About: { screen: About, title: 'About' },
	Filters: { screen: Filters, title: 'Filters' },
	Favorites: { screen: Favorites, title: 'Favorites' }
});

const App = () => {
	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	);
};

AppRegistry.registerComponent('MovieDice', () => App);