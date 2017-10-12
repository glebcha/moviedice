export default {
	slide: {
		position: 'relative',
		height: 'auto',
		maxHeight: 495,
		minHeight: 285,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ccc',
		borderRadius: 15,
		overflow: 'hidden',
	},
	title: {
		color: '#e6ebf1',
		fontSize: 35,
		textAlign: 'center',
		textShadowColor: '#000',
		textShadowOffset: {
			width: 1, 
			height: 1
		},
		textShadowRadius: 5,
		marginLeft: 10,
		marginRight: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	overview: {
		color: '#253e5c',
		fontSize: 15,
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	overviewWrap: {
		height: 'auto',
		maxHeight: 495,
		minHeight: 285,
	},
	genresContainer: {
		flex: 1, 
		alignItems: 'center',
		justifyContent: 'center', 
		flexDirection: 'row',
		flexWrap:'wrap',
		padding: 10,
	},
	genre: {
		color: '#e6ebf1',
		fontSize: 15, 
		textShadowColor: '#000',
		textShadowOffset: {
			width: 3, 
			height: 1
		},
		textShadowRadius: 5,
	},
	actionButtonIcon: {
		fontSize: 30,
		height: 30,
		color: '#000',
	},
};