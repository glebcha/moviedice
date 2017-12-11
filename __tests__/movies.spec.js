import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Movies from '../app/components/Movies';
import data from '../__mocks__/data/movies';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Movies component', () => {
	it('should render correctly', () => {
		const tree = renderer.create(<Movies />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('should show image while loading movies', () => {
		const tree = renderer.create(<Movies />).toJSON();

		expect(tree.children).toHaveLength(3);
		expect(tree.children[1].children[0].children[0]).not.toBeUndefined();
		expect(tree.children[1].children[0].children[0].type).toBe('Image');
	});
	
	it('should not render empty movies list', () => {
		const tree = renderer.create(<Movies isFetching={false} />).toJSON();

		expect(tree.children).toHaveLength(2);
		expect(tree.children[0].type).toBe('Text');
		expect(tree.children[1].type).toBe('Text');
	});
	
	it('should render movies list', () => {
		const {results} = data;
		const renderer = new ShallowRenderer();
		const tree = renderer.render(
			<Movies 
				items={results}
				isFetching={false} 
			/>
		);

		expect(tree.props.children[1].props.children).toBeDefined();
		expect(tree.props.children[1].props.children).toHaveLength(21);
	});
});