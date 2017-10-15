import React from 'react';
import { View, Text } from 'react-native';

export default function Notice() {
	return (
		<View 
			style={{
				flex: 1, 
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text style={{fontSize: 30}}>
				Please, use portrait mode.
			</Text>
		</View>
	);
}