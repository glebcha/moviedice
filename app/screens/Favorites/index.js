import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import _ from 'lodash';
import Favorite from './Favorite';
import headerStyle from '../../styles/header';

function mapStateToProps(state) {
	const {api, movies: {favorites}} = state;

	return {api, favorites};
}

@connect(mapStateToProps)
export default class Favorites extends PureComponent {

	static get propTypes() {
		return {
			api: PropTypes.object.isRequired,
			favorites: PropTypes.array.isRequired
		};
	}

	static navigationOptions = {
		title: 'Favorites',
		...headerStyle
	}

	render() {
		const {api, favorites, dispatch} = this.props;
		const imageBaseUrl = _.get(api, 'item.images.base_url');
		const imageSize = _.get(api, 'item.images.backdrop_sizes', [])[1];
		const imageUrl = `${imageBaseUrl}${imageSize}`;

		return (
			<ScrollView contentContainerStyle={{padding: 20}}>
				{favorites.length > 0 && favorites.map(favorite => 
					<Favorite
						key={favorite.id} 
						item={favorite}
						imageUrl={imageUrl} 
						dispatch={dispatch}
					/>
				)}
			</ScrollView>
		);
	}
}