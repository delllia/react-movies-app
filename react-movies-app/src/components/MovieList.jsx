import React from 'react';
import MovieCard from './MovieCard';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<MovieCard
					key={index}
					title={movie.title}
					release={movie.release_date.slice(0,4)}
				path={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
				onClick={() => props.handleFavouritesClick(movie)}
				footer={<FavouriteComponent movie={movie} />}
				/>
			))}
		</>
	);
};

export default MovieList;
