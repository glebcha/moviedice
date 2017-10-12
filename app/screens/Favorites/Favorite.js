import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { 
	View, 
	Text, 
	Image
} from 'react-native';
import _ from 'lodash';
import Collapse from 'react-native-bar-collapsible';
import ActivityButton from '../../components/ActivityButton';
import { removeFavoriteMovie } from '../../actions/movies';
import styles from './styles';

export default class Favorite extends PureComponent {
	
	static get propTypes() {
		return {
			item: PropTypes.object.isRequired,
			dispatch: PropTypes.func.isRequired,
			imageUrl: PropTypes.string.isRequired
		};
	}

	static defaultProps = {
		item: {},
		dispatch: () => {},
		imageUrl: '/'
	}

	onRemove = () => {
		const {item, dispatch} = this.props;
		
		dispatch({
			type: 'GET_ITEM', 
			payload: {id: 'md_favorites'}
		})
		.then((data) => {
			const favorites = JSON.parse(data);
			const itemIndex = _.findIndex(favorites, {id: item.id});
		
			if (itemIndex >= 0) {
				favorites.splice(itemIndex, 1);
				
				dispatch(removeFavoriteMovie(item));

				dispatch({
					type: 'SET_ITEM', 
					payload: {
						id: 'md_favorites', 
						body: JSON.stringify(favorites)
					}
				}); 
			}
		});  

	}

	render() {
		const {item, imageUrl} = this.props;
		const {
			title, 
			overview, 
			backdrop_path, 
			poster_path
		} = item;
		const uri = `${imageUrl}${backdrop_path || poster_path}`;
		
		const collapseProps = {
			style: styles.collapse,
			titleStyle: styles.collapseTitle,
			tintColor: "#000",
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
			<Collapse
				title={title}
				{...collapseProps}
			>
				<View>
					<Image 
						source={{uri}} 
						style={styles.poster}
					/>
					<Text style={{paddingVertical: 20}}>
						{overview}
					</Text>
					<ActivityButton
						text="Remove from favorites"
						onPress={this.onRemove}
					/>
				</View>
			</Collapse>
		);
	}
}