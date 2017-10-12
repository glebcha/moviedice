import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Collapse from 'react-native-bar-collapsible';
import { saveFilters } from '../../actions/filters';
import Genres from './Genres';
import ActivityButton from '../../components/ActivityButton';
import { Rating, CountrySelect } from './Partials';
import { getLocale } from '../../utils/helpers';
import headerStyle from '../../styles/header';
import styles from './styles';

function mapStateToProps(state) {
	const {general:{orientation}, genres, filters} = state;

	return {orientation, genres, filters};
}

@connect(mapStateToProps)
export default class Filters extends PureComponent {

	static get propTypes() {
		return {
			genres: PropTypes.object.isRequired,
			filters: PropTypes.object.isRequired,
			orientation: PropTypes.string.isRequired,
			checked: PropTypes.array
		};
	}

	static navigationOptions = {
		title: 'Filters',
		...headerStyle
	}

	get lang() {
		const locale = DeviceInfo.getDeviceLocale();
		const country = DeviceInfo.getDeviceCountry();

		return {locale, country};
	}

	get moviesQuery() {
		const {genres, lang, rating, votes} = this.state;

		const query = `vote_average.gte=${ 
			rating 
		}${ 
			genres.length > 0 ? `&with_genres=${ genres.join(',') }` : ''
		}&language=${ 
			lang.locale 
		}&vote_count.gte=${
			votes
		}`;

		return query;
	}

	componentWillMount() {
		const {filters} = this.props;
		const lang = this.lang;

		this.setState({
			lang, 
			genres: filters.genres, 
			...filters
		});
	}

	onGenresChange = (genre, checked) => {
		const {genres} = this.state;
		const index = genres.indexOf(genre.id);
		let updated = [...genres];

		if(checked && index < 0) {
			updated.push(genre.id);           
		} else {
			updated.splice(index,1);
		}

		this.setState({genres: updated});
	}

	onCountryChange = (value)=> {
		const {lang} = this.state;
		const locale = getLocale(value.cca2)[0];

		this.setState({
			lang: {
				...lang,
				locale, 
				country: value.cca2,
			}
		})
	}

	onRatingChange = (value) => {
		const rating = parseFloat(value.toFixed(2));
		this.setState({rating});
	}

	onSaveFilters = () => {
		const {
			navigation: {navigate}, 
			dispatch
		} = this.props;
		const {genres, lang, rating} = this.state;

		dispatch({
			type: 'SET_ITEM', 
			payload: {id: 'md_filters', body: JSON.stringify({genres, lang, rating})}
		});

		dispatch(saveFilters({genres, lang, rating}));
		navigate('Home');
	}

	render() {
		const {orientation, genres} = this.props;
		const collapseProps = {
			style: styles.collapse,
			titleStyle: styles.collapseTitle,
			tintColor: '#000',
			collapsible: true,
			showOnStart: false,
			iconSize: 12,
			iconStyle: {
				padding: 0,
				width: 25
			},
			iconCollapsed: 'chevron-down',
			iconOpened: 'chevron-up',
			iconActive: 'sort'
		};

		return (
			<ScrollView contentContainerStyle={{padding: 20}}>
				<Collapse
					title="Genres"
					{...collapseProps}
				>
					<Genres 
						items={genres.items}
						orientation={orientation}
						checked={this.state.genres}
						onGenresChange={this.onGenresChange} 
					/>
				</Collapse>

				<Collapse
					title="Rating"
					{...collapseProps}
				>
					{Rating.call(this)}
				</Collapse>

				{CountrySelect.call(this)}

				<ActivityButton
					text="Save Filters"
					onPress={this.onSaveFilters}
				/>
			</ScrollView>
		);
	}
}