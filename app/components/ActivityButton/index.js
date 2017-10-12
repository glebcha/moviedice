import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text } from 'react-native';
import styles from './styles';

export default class ActivityButton extends PureComponent {

	static get propTypes() {
		return {
			text: PropTypes.string.isRequired,
			onPress: PropTypes.func.isRequired
		};
	}

	static defaultProps = {
		text: 'Press me',
		onPress: () => {}
	}

	state = {
		pressed: false
	}

	onHideUnderlay = () => {
		this.setState({pressed: false});
	}

	onShowUnderlay = () => {
		this.setState({pressed: true});
	}

	render() {
		const {text, onPress} = this.props;
		const {pressed} = this.state;
		
		return (
			<TouchableHighlight
				style={[styles.button, pressed ? styles.buttonTouched : {}]}
				onHideUnderlay={this.onHideUnderlay}
				onShowUnderlay={this.onShowUnderlay}
				onPress={onPress}
			>
				<Text style={{color: '#000'}}>
					{text.toUpperCase()}
				</Text>
			</TouchableHighlight>
		);
	}
}