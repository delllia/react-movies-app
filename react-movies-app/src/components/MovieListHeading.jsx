import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='movieHeading' onClick={props.onClick}>
			<h1>{props.heading}</h1>
			<h3>{props.genre}</h3>
		</div>
	);
};

export default MovieListHeading;
