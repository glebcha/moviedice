import React from 'react';
import { 
	Text, 
	View,
	Image,
	ScrollView,
	TouchableOpacity 
} from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import dice from '../../styles/images/dice.png';
import styles from './styles';

export function renderItem() {
	const {item} = this.props;
	const {
		title, 
		overview, 
		vote_average
	} = item;
	const {showOverview} = this.state;
	const genres = this.genreCollection || [];
	const hasOverview = overview && overview.length > 0;
	const overviewText = hasOverview ? overview : 'No description in selected language :(';

	return (
		<TouchableOpacity
			key="item" 
			style={{position: 'absolute'}} 
			onPress={this.onTitleClick}
		> 
			<ScrollView style={showOverview ? styles.overviewWrap : {}}>
				<Text style={showOverview ? styles.overview : styles.title}>
					{showOverview ? overviewText : title}
				</Text>
			</ScrollView>
						
			{!showOverview &&
				[
					<View key="genres" style={styles.genresContainer}>
						{genres.map((genre, index) =>
							<Text key={genre.id} style={styles.genre}>
								{`${genre.name}${index !== genres.length - 1 ? ', ' : ''}`}
							</Text>
						)}
					</View>,
					<Text key="icon" style={[styles.title, {fontSize: 25}]}>
						<Icon
							name="md-pulse" 
							size={30} 
							color="#900" 
						/>
						{` ${vote_average}`}
					</Text>
				]
			}
			
		</TouchableOpacity>
	);
}

export function renderRefresh(item) {
	const {openFilters} = item;

	return (
		<TouchableOpacity 
			style={{
				position: 'absolute', 
				alignItems: 'center'
			}} 
			onPress={openFilters}
		> 
			<Icon 
				name="md-options"
				size={100} 
				color="#e6ebf1" 
			/>
			<Text>Nothing more, maybe change filters</Text>
		</TouchableOpacity>
	);
}

export function renderMenu() {
	const {loadRandomMovies, item: {isFavorite}} = this.props;
	const iconName = isFavorite ? 'ios-heart' : 'ios-heart-outline';

	return (
		<ActionButton 
			key="menu" 
			itemSize={60}
			buttonColor="rgba(255,255,255, 0.8)"
			btnOutRange="rgba(255,255,255, 0.5)"
			icon={<Image style={{width:35, height: 35}} source={dice} />}
			onLongPress={loadRandomMovies}
		>
			<ActionButton.Item 
				buttonColor="rgba(255,255,255, 0.8)"  
				title="Favorite" 
				onPress={this.manageFavorite}
			>
				<Icon 
					name={iconName} 
					style={[styles.actionButtonIcon, {color: 'red'}]} 
				/>
			</ActionButton.Item>
			<ActionButton.Item 
				buttonColor="rgba(255,255,255, 0.8)" 
				title="Similar" 
				onPress={this.loadSimilarMovies}
			>
				<Icon 
					name="ios-search-outline" 
					style={styles.actionButtonIcon} 
				/>
			</ActionButton.Item>
		</ActionButton>
	);
}