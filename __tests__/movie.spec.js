import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Movie from '../app/components/Movie';
import data from '../__mocks__/data/movies';
import genres from '../__mocks__/data/genres';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Movie component', () => {
    it('should render correctly', () => {
        const tree = renderer.create(
            <Movie 
                item={data.results[0]} 
                imageUrl={'http://imgur.com'}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
	});
	
	it('should not render empty movie', () => {
		const {page, total_results, total_pages} = data;
		const renderer = new ShallowRenderer();
		const tree = renderer.render(<Movie item={null} />);
        
        expect(tree).toBeNull();
    });
    
    it('should not render image without url', () => {
		const renderer = new ShallowRenderer();
		const tree = renderer.render(<Movie item={data.results[0]} />);

        expect(tree.props.children[0]).toBeUndefined();
    });

    it('should render movie without genre or genres', () => {
		const {page, total_results, total_pages} = data;
        const renderer = new ShallowRenderer();
        const withEmptyGenres = renderer.render(
            <Movie 
                item={data.results[0]} 
                genres={{items: null}} 
            />
        );
		const withEmptyGenre = renderer.render(
            <Movie 
                item={data.results[0]} 
                genres={{items: [null]}} 
            />
        );
        
        expect(withEmptyGenres).not.toBeNull();
        expect(withEmptyGenre).not.toBeNull();
    });
});