import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppIntro from 'react-native-app-intro-v2';
import IconIon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PASSED_INTRO } from '../../constants/general';
import dice from '../../styles/images/dice.png';
import styles from './styles';

function mapStateToProps(state) {
	const {general} = state;

	return {general};
}

@connect(mapStateToProps)
class About extends PureComponent {

	static get propTypes() {
		return {
			navigation: PropTypes.object.isRequired,
			dispatch: PropTypes.func.isRequired
		};
	}

	onSkipBtnHandle = () => {
		const {
			navigation: {navigate},
			dispatch
		} = this.props;

		dispatch({
			type: 'SET_ITEM', 
			payload: {
				id: 'md_intro', 
				body: 'true'
			}
		})
		.then(() => {
			dispatch({
				type: PASSED_INTRO,
				payload: true
			});
			navigate('Home', {fromAbout: true});
		});
		
	}

	render() {
		return (
			<AppIntro
				rightTextColor="#5a5c6d"
				leftTextColor="#5a5c6d"
				dotColor="#5a5c6d"
				activeDotColor="rgba(255,255,255,.5)"
				onDoneBtnClick={this.onSkipBtnHandle}
				onSkipBtnClick={this.onSkipBtnHandle}
			>
				<View style={styles.slide}>
					<View level={10}>
						<View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
							<Icon style={{color: '#5a5c6d'}} name="gesture-swipe-left" size={100} />
							<Icon style={{color: '#5a5c6d'}} name="gesture-swipe-right" size={100} />
						</View>
						<View>
							<Text style={[styles.text, {paddingTop: 30}]}>Swipe card left/right to show previous/next movie</Text>
						</View>
					</View>
				</View>
				<View style={styles.slide}>
					<View level={-20}>
						<Image style={{width:135, height: 135}} source={dice} />
					</View>
					<View level={20}>
						<View>
							<Text style={[styles.text, {paddingTop: 30}]}>Tap dice to show menu or hold shortly to get random movies stack</Text>
						</View>
					</View>
				</View>
				<View style={styles.slide}>
					<View level={38}>
						<IconIon style={{color: 'red'}} name="ios-heart-outline" size={135} />
					</View>
					<View level={-10}>
						<View>
							<Text style={styles.text}>Tap to add as favorite movie</Text>
						</View>
					</View>
				</View>
				<View style={styles.slide}>
					<View level={-5}>
						<IconIon name="ios-search-outline" size={135} />
					</View>
					<View level={15}>
						<View>
							<Text style={styles.text}>Tap to search similar movies</Text>
						</View>
					</View>
				</View>
			</AppIntro>
		);
	}
}

About.navigationOptions = {
	title: 'About',
	header: null
};

export default About;