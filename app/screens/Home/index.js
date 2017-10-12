// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	TouchableOpacity, 
	DrawerLayoutAndroid 
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchApiConfig } from '../../actions/api';
import { changedOrientation } from '../../actions/general';
import { fetchMovies, fetchGenres } from '../../actions/movies';
import Movies from '../../components/Movies';
import { DrawerView } from './Partials';
import { FETCHED_API_CONFIG } from '../../constants/api';
import { PASSED_INTRO } from '../../constants/general';
import { SAVE_FILTERS } from '../../constants/filters';
import { 
	FETCHED_GENRES, 
	SAVE_FAVORITES 
} from '../../constants/movies';
import { checkDBConfig } from '../../utils/helpers';
import styles from './styles';

type moviesQueryParamsType = {
	isNext: boolean, 
	isPrev: boolean,
	random: boolean
};

type moviesQueryPropType = {
	genres: {items: Array<any>},
	movies: {
		optional: {page: number, total_pages: number}
	},
	filters: {
		genres: Array<any>, 
		lang: {locale: string}, 
		votes: number, 
		rating: number
	}
}
type eventType = {
	nativeEvent?: {
		layout?: {
			width: number, 
			height: number
		}
	}
};

function mapStateToProps(state) {
	const {api, movies, general, genres, filters} = state;

	return {api, movies, general, genres, filters};
}

@connect(mapStateToProps)
export default class Home extends Component {

	static get propTypes() {
		return {
			navigation: PropTypes.object.isRequired,
			api: PropTypes.object.isRequired,
			movies: PropTypes.object.isRequired,
			general: PropTypes.object.isRequired,
			genres: PropTypes.object.isRequired,
			filters: PropTypes.object.isRequired,
			dispatch: PropTypes.func.isRequired
		};
	}

	static navigationOptions = {
		title: 'Movies Stack', 
		header: null
	}

	drawer: any = null

	componentWillMount() {
		const {
			general: {intro},
			movies: {favorites}, 
			navigation: {navigate},
			filters, 
			dispatch
		} = this.props;

		checkDBConfig({
			id: 'md_intro', 
			type: PASSED_INTRO,
			payload: intro.passed,
			dispatch
		})
		.then(() => {
			const isIntroPassed = _.get(this.props, 'general.intro.passed', false);

			if (!isIntroPassed) {
				navigate('About');
				throw undefined;
			} else {
				return;
			}
		})
		.then(() => checkDBConfig({
			id: 'md_api_config', 
			type: FETCHED_API_CONFIG,
			fetcher: fetchApiConfig,
			dispatch
		}))
		.then(() => checkDBConfig({
			id: 'md_genres', 
			type: FETCHED_GENRES,
			fetcher: fetchGenres,
			dispatch
			
		}))
		.then(() => checkDBConfig({
			id: 'md_filters', 
			type: SAVE_FILTERS,
			payload: filters,
			dispatch
		}))
		.then(() => checkDBConfig({
			id: 'md_favorites', 
			type: SAVE_FAVORITES,
			payload: favorites,
			dispatch
		}))
		.then(() => {
			const fromAbout = _.get(this.props, 'navigation.state.params.fromAbout', false);

			if (!fromAbout) {
				const query = this.moviesQuery();
				
				dispatch(fetchMovies(query));
			}
		});
		
	}

	moviesQuery = (params?:any={}) => {
		const {
			isNext=false, 
			isPrev=false, 
			random=false
		}: moviesQueryParamsType = params;
		const {movies, genres: {items}, filters}: moviesQueryPropType = this.props;
		const {optional={}} = movies;
		const {page} = optional;
		const {genres, lang, rating, votes} = filters;
		const definedGenres = genres.length > 0 ? genres.join(',') : '';
		const randomGenre = _.random(0, items.length - 1);
		const randomRating = _.random(1, 10, true).toFixed(1);

		const sortTypes = [
			'popularity.desc',
			'popularity.asc', 
			'release_date.asc', 
			'release_date.desc', 
			'revenue.asc', 
			'revenue.desc', 
			'primary_release_date.asc', 
			'primary_release_date.desc', 
			'original_title.asc', 
			'original_title.desc', 
			'vote_average.asc', 
			'vote_average.desc', 
			'vote_count.asc', 
			'vote_count.desc'
		];

		const randomSortType = _.random(0, sortTypes.length - 1);
		let pageNum = '';

		if (isNext) {
			pageNum = `&page=${page + 1}`;
		}
		else if (isPrev) {
			pageNum = `&page=${page - 1}`;
		}

		const query = `vote_average.gte=${ 
			random ? randomRating : rating 
		}&with_genres=${ 
			random ? items[randomGenre]['id'] : definedGenres
		}&language=${ 
			lang.locale 
		}&vote_count.gte=${
			random ? _.random(1,10) : votes 
		}&sort_by=${
			random ? sortTypes[randomSortType] : sortTypes[0]
		}${ 
			pageNum 
		}`;

		return query;
	}

	openDrawer = () => {
		this.drawer.openDrawer();
	}

	closeDrawer = () => {
		this.drawer.closeDrawer();
	}

	onLayoutChange = (event: eventType) => {
		const {dispatch} = this.props;
		const {nativeEvent = {}} = event;
		const {layout = {width: 0, height: 0}} = nativeEvent;
		const {width, height} = layout;
		const orientation = (width > height) ? 'LANDSCAPE' : 'PORTRAIT';

		dispatch(changedOrientation(orientation));
	}

	loadPrevMovies = () => {
		const {dispatch} = this.props;

		dispatch(fetchMovies(this.moviesQuery({isPrev: true})));
	}

	loadNextMovies = () => {
		const {dispatch} = this.props;

		dispatch(fetchMovies(this.moviesQuery({isNext: true})));
	}

	loadRandomMovies = () => {
		const {dispatch} = this.props;

		dispatch(fetchMovies(this.moviesQuery({random: true})));
	}

	openFilters = () => {
		const {navigation: {navigate}} = this.props;

		navigate('Filters');
	}

	render() {
		const {
			api, 
			movies, 
			genres,
			general,
			filters,
			dispatch,
			navigation
		} = this.props;
		const {orientation} = general;

		return (
			<DrawerLayoutAndroid
				ref={(drawer) => this.drawer = drawer}
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => DrawerView({
					navigation, 
					closeDrawer: this.closeDrawer
				})}
			>
			
				<TouchableOpacity
					style={styles.menu}
					onPress={this.openDrawer}
				>
					<Icon 
						name="ios-menu" 
						size={25} 
						color="#ccc" 
					/>
				</TouchableOpacity> 
				
				<Movies 
					api={api}
					genres={genres}
					filters={filters}
					dispatch={dispatch}
					orientation={orientation}
					openFilters={this.openFilters}
					loadPrevMovies={this.loadPrevMovies}
					loadNextMovies={this.loadNextMovies}
					loadRandomMovies={this.loadRandomMovies}
					onLayoutChange={this.onLayoutChange} 
					{...movies} 
				/>
				
			</DrawerLayoutAndroid>
		);
	}
}