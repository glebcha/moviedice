import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import _ from 'lodash';
import Swiper from 'react-native-swiper-animated';
import Pulse from 'react-native-pulse';
import Movie from '../Movie';
import dice from '../../styles/images/dice.png';
import styles from './styles';

export default class Movies extends PureComponent {

	static get propTypes() {
		return {
			api: PropTypes.object.isRequired,
			genres: PropTypes.object.isRequired,
			items: PropTypes.array.isRequired, 
			favorites: PropTypes.array.isRequired, 
			filters: PropTypes.object,
			optional: PropTypes.object,
			orientation: PropTypes.string,
			error: PropTypes.object, 
			onLayoutChange: PropTypes.func.isRequired,
			loadPrevMovies: PropTypes.func,
			loadNextMovies: PropTypes.func,
			loadRandomMovies: PropTypes.func,
			openFilters: PropTypes.func,
			dispatch: PropTypes.func.isRequired,
			isFetching: PropTypes.bool.isRequired
		};
	}

	static defaultProps = {
		api: {},
		filters: {},
		genres: {},
		items: [],
		favorites: [],
		optional: {},
		orientation: 'PORTRAIT',
		onLayoutChange: () => {}, 
		openFilters: () => {},
		loadPrevMovies: () => {},
		loadNextMovies: () => {},
		loadRandomMovies: () => {},
		dispatch: () => {},
		error: null,
		isFetching: false
	}

	state = {
		startIndex: 0,
		currentIndex: 0
	}

	swiper = null

	get currentIndex() {
		const {currentIndex, guid} = this.swiper;

		return currentIndex[guid];
	}

	onLeftSwipe = () => {
		const {
			items,
			loadPrevMovies,
			optional: {total_pages, page}
		} = this.props;

		if (this.currentIndex === 0 && total_pages !== 1 && page > 1) {
			this.setState(
				{startIndex: items.length - 1}, 
				() => loadPrevMovies()
			);
		}
	}

	onRightSwipe = () => {
		const {
			items, 
			loadNextMovies,
			optional: {total_pages, page}
		} = this.props;
		const hasPages = total_pages !== page;
		const isLastPage = this.currentIndex === items.length - 1 && hasPages;

		if (isLastPage) {
			this.setState(
				{startIndex: 0}, 
				() => loadNextMovies()
			);
		}
	}

	render() {
		const {
			api, 
			genres,
			filters,
			items, 
			favorites,
			//error, 
			optional,
			orientation, 
			onLayoutChange, 
			isFetching,
			openFilters,
			loadRandomMovies,
			dispatch
		} = this.props;
		const {startIndex} = this.state;
		const {total_pages, pages} = optional;
		const askFilters = total_pages === pages;
		const imageBaseUrl = _.get(api, 'item.images.base_url');
		const imageSize = _.get(api, 'item.images.backdrop_sizes', [])[1];
		const imageUrl = `${imageBaseUrl}${imageSize}`;
		const fetching = isFetching || api.isFetching;
		const isEmpty = items.length === 0 || askFilters;
		const noMovies = !fetching && isEmpty;
		const imageStyle = {
			position: 'absolute', 
			top: 400/3, 
			left: 400/3, 
			width: 400/3, 
			height: 400/3
		};

		if (noMovies || total_pages === 1) {
			items.push({
				id: 'end', 
				genre_ids: [],
				openFilters
			});
		}

		return (
			<View 
				onLayout={onLayoutChange} 
				style={styles.wrapper}
			>
				
				{!fetching && items.length > 0 &&
					<Swiper
						ref={swiper => this.swiper = swiper}
						style={styles.swiper}
						loop={false}
						stack={false}
						dragY={false}
						index={startIndex}
						showPagination={false}
						swiperThreshold={60}
						onRightSwipe={this.onRightSwipe}
						onLeftSwipe={this.onLeftSwipe}
						smoothTransition
					>
						{items.map(item => {
							if (!item) {
								return;
							}
							
							item.orientation = orientation;
							item.isFavorite = _.findIndex(favorites, {id: item.id}) >= 0;

							return (
								<Movie 
									key={item.id}  
									item={item}
									genres={genres}
									filters={filters}
									imageUrl={imageUrl} 
									dispatch={dispatch}
									loadRandomMovies={loadRandomMovies}
								/>
							);
						})}
					</Swiper>
				} 
				
				{fetching &&
					<Pulse 
						color="#65697c" 
						numPulses={3} 
						diameter={400} 
						speed={5} 
						duration={800}
						image={{
							style: imageStyle,
							source: dice
						}} 
					/>
				} 
				
			</View>
		);
	}
}