// @flow
import React from 'react';
import { 
	Text, 
	View, 
	TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type drawerProps = {
	navigation: {
		navigate: (screen: string) => void
	}, 
	closeDrawer: () => void
}

export const DrawerView = (props: drawerProps) => {
	const {navigation: {navigate}, closeDrawer} = props;
	const {drawerContainer, drawerText, menuItem} = styles;

	return (
		<View style={drawerContainer}>
			<TouchableOpacity 
				style={menuItem}
				activeOpacity={1}
				onPress={() => {
					closeDrawer();
					navigate('Filters');
				}}
			>
				<Icon 
					name="ios-funnel" 
					style={{fontSize: 20}}
				/>
				<Text style={drawerText}>Filters</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={menuItem}
				activeOpacity={1}
				onPress={() => {
					closeDrawer();
					navigate('Favorites');
				}}
			>
				<Icon 
					name="ios-heart" 
					style={{fontSize: 20}}
				/>
				<Text style={drawerText}>Favorites</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={[menuItem, {position: 'absolute',bottom: 10}]}
				activeOpacity={1}
				onPress={() => {
					closeDrawer();
					navigate('About');
				}}
			>
				<Icon 
					name="ios-help-circle" 
					style={{fontSize: 20}}
				/>
				<Text style={drawerText}>About Movie Dice</Text>
			</TouchableOpacity>
		</View>
	);
};