import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Checkbox from '../../../components/Checkbox';
import styles from './styles';

export default class Genres extends PureComponent {

	static get propTypes() {
		return {
			items: PropTypes.array.isRequired,
			checked: PropTypes.array.isRequired,
			orientation: PropTypes.string.isRequired,
			onGenresChange: PropTypes.func.isRequired
		};
	}

	columns = {}

	makeColumns = (count = 3) => {
		const {orientation, items} = this.props;
		const isPortrait = orientation === 'PORTRAIT';
		const columns = isPortrait ? 2 : count;
		const offset = Math.ceil(items.length/columns);
		
		let counter = 0;
		let result = [];

		if (!this.columns[orientation]) {
			while(counter < items.length) {
				result.push(items.slice(counter,offset+counter));
				counter += offset; 
			}

			this.columns[orientation] = result;
			return result;
		}

		return this.columns[orientation];
	}

	render() {
		const {checked, onGenresChange} = this.props;
		const columns = this.makeColumns();

		return (
			<View style={styles.columns}>
				{columns.map((column, index) => 
					<View key={index} style={styles.column}>
						{column.map(genre => 
							<Checkbox
								key={genre.id}
								label={{
									style: styles.label,
									text: genre.name
								}}
								icon={{color: '#000'}}
								checked={checked.indexOf(genre.id) >= 0}
								onPress={onGenresChange.bind(null, genre)}
							/>
						)}
					</View>
				)}
			</View> 
		);
	}
}