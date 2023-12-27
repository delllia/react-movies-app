import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import MoviesContext from "../context/MoviesContext";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import RemoveFavourites from "../components/RemoveFavourites";

const FavouritesPage = () => {
	const { favourites, removeFavouriteMovie } = useContext(MoviesContext);
	const navigateTo = useNavigate();
	const location = useLocation();

	const handleNavigate = (event, route) => {
		route = event.target.textContent.toLowerCase();
		navigateTo(`/${route}`, { state: location.state });
	};

	const removeFromFavourites = (movie) => {
		removeFavouriteMovie(movie);
	};

	return (
		<div className={styles.movieApp}>
			<Header
				genre={""}
				handleNavigate={handleNavigate}
				isSearchAvailable={false}
			/>

			<div className={styles.scrollableContainer}>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFromFavourites}
					favouriteComponent={({ movie }) => (
						<RemoveFavourites
							title={movie.title}
							release={movie.release_date}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default FavouritesPage;
