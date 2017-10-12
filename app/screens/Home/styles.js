import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	menu: {
		position: 'absolute',
		top: 5,
		left: 20,
		zIndex: 1
	},
	mainWelcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	mainInstructions: {
		color: '#333',
		marginBottom: 5,
	},
	drawerContainer: {
		flex: 1, 
		backgroundColor: '#fff'
	},
	drawerText: {
		margin: 10, 
		fontSize: 17, 
		textAlign: 'left'
	},
	menuItem: {
		flexDirection: 'row', 
		alignItems: 'center',
		paddingHorizontal: 20
	}
});