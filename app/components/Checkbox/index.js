import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Checkbox extends PureComponent {

	static get propTypes() {
		return {
			style: PropTypes.object,
			onPress: PropTypes.func,
			icon: PropTypes.object,
			label: PropTypes.object,
			checked: PropTypes.bool
		};
	}

	static defaultProps = {
		onPress: () => {}
	}

	state = {
		style: {
			flexDirection: 'row',
			flexWrap:'wrap',
			alignItems: 'center',
			padding: 5
		},
		icon: {
			default: 'checkbox-blank-circle-outline',
			checked: 'check-circle-outline',
			style: {
				marginRight: 5
			},
			size: 25,
			color: '#fff'
		},
		label: {
			style: {
				fontSize: 20,
				color: '#fff'
			},
			text: 'Checkbox'
		}
	}

	componentWillMount() {
		const {
			style, 
			icon, 
			label, 
			checked=false
		} = this.props;

		this.setState({
			style: {...this.state.style, ...style},
			icon: {...this.state.icon, ...icon},
			label: {...this.state.label, ...label},
			checked
		});
	}

	onCheckboxClick = () => {
		const {onPress} = this.props;
		const {checked} = this.state;

		this.setState({checked: !checked}, () => onPress(!checked));
	}

	render() {
		const {style, label, icon, checked} = this.state;

		return (
			<TouchableOpacity
				style={style}
				activeOpacity={0.8}
				onPress={this.onCheckboxClick}
			>
				<Icon
					style={icon.style} 
					name={checked ? icon.checked : icon.default} 
					size={icon.size} 
					color={icon.color}
				/>
				<Text style={label.style}>{label.text}</Text>
			</TouchableOpacity>
		);
	}
}