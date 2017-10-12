import React from 'react';
import { 
	View, 
	Text, 
	Slider
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import styles from './styles';

export function Rating() {
	const {rating=5} = this.state;

	return (
		<View style={{flex: 1, alignItems: 'center'}}>
			<Slider
				style={{width: 400}}
				value={rating}
				step={0.1}
				maximumValue={10}
				minimumValue={1}
				onValueChange={this.onRatingChange}
			/>
			<Text style={{fontSize: 15}}>
				{rating}
			</Text>
		</View>
	);
}

export function CountrySelect() {
	const {lang} = this.state;
	const cca2 = lang.locale.split('-')[1];

	return (
		<View style={styles.countries}>
			<Text style={styles.link}>
				Choose locale:
			</Text>
			<CountryPicker
				ref={(picker) => this.picker = picker}
				style={{flex: 1}}
				filterable={true}
				cca2={cca2}
				translation="eng"
				onChange={this.onCountryChange}
			/>
		</View>
	);
}