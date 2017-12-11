import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import _ from 'lodash';
import { 
	renderItem, 
	renderMenu,
	renderRefresh 
} from './Partials';
import { 
	fetchSimilarMovies,
	addFavoriteMovie,
	removeFavoriteMovie 
} from '../../actions/movies';
import styles from './styles';

export default class Movie extends Component {

	static get propTypes() {
		return {
			item: PropTypes.object,
			genres: PropTypes.object,
			filters: PropTypes.object,
			imageUrl: PropTypes.string,
			dispatch: PropTypes.func
		};
	}

	static defaultProps = {
		item: {},
		genres: {
			items: []
		},
		dispatch: () => {},
	}

	get genreCollection() {
		const {item, genres: {items}} = this.props;
		const {genre_ids} = item;

		if (!items || items.length === 0) {
			return [];
		}

		return items.filter(genre => genre && genre_ids.indexOf(genre.id) >= 0);
	}

	state = {
		showOverview: false
	}

	onTitleClick = () => {
		const {showOverview} = this.state;

		this.setState({showOverview: !showOverview});
	}

	loadSimilarMovies = () => {
		const {
			item, 
			filters:{lang}, 
			dispatch
		} = this.props;
		const params = `language=${ lang ? lang.locale : 'en-US' }`;

		dispatch(fetchSimilarMovies(item.id, params));
	}

	manageFavorite = () => {
		const {item, dispatch} = this.props;

		dispatch({
			type: 'GET_ITEM', 
			payload: {id: 'md_favorites'}
		})
		.then((data) => {
			const favorites = JSON.parse(data);
			const itemIndex = _.findIndex(favorites, {id: item.id});

			if (itemIndex < 0) {
				favorites.push(item);
				dispatch(addFavoriteMovie(item));
			} else {
				favorites.splice(itemIndex, 1);
				dispatch(removeFavoriteMovie(item));
			}

			dispatch({
				type: 'SET_ITEM', 
				payload: {
					id: 'md_favorites', 
					body: JSON.stringify(favorites)
				}
			}); 
		}); 

	}

	render() {
		const {item, imageUrl} = this.props;

		if (!item) {
			return null;
		}

		const {orientation, backdrop_path, poster_path} = item;
		const {showOverview} = this.state;
		const uri = `${imageUrl}${backdrop_path || poster_path}`;
		const imageStyle = {
			alignSelf: 'stretch',
			borderRadius: 15,
			opacity: showOverview ? 0.1 : 0.8,
			minHeight: orientation === 'PORTRAIT' ? styles.slide.maxHeight : styles.slide.minHeight
		};

		return (
			<View style={styles.slide}>
				{imageUrl &&
					<Image 
						source={{uri}} 
						style={imageStyle} 
					/>
				}

				{item.id !== 'end' &&
					[
						renderItem.call(this),
						renderMenu.call(this)
					]
				}

				{item.id === 'end' &&
					renderRefresh.call(this, item)
				}
			</View>
		);
	}
}