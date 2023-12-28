import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import AddFavourites from "../components/AddFavourites";
import AddedToFavourites from "../components/AddedToFavourites";

import { API_KEY } from "../constants";
import useDebounce from "../utils/useDebounce";
import MoviesContext from "../context/MoviesContext";

const MoviesPage = () => {
	const [moviesDisplay, setMoviesDisplay] = useState({
		movies: [],
		searchValue: "",
	});
	const [genres, setGenres] = useState([]);
	const [genre, setGenre] = useState("All");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [infoText, setInfoText] = useState("Loading...");
	const debouncedSearch = useDebounce(moviesDisplay.searchValue, 1000);
	const {
		favourites,
		loadMore,
		pageNo,
		addFavouriteMovie,
		removeFavouriteMovie,
		addLoadMoreValue,
		increasePageNo,
		decreasePageNo,
		resetPageNo,
	} = useContext(MoviesContext);
	const navigateTo = useNavigate();
	const apiKey = API_KEY;
	let url;

	useEffect(() => {
		getGenreRequest();
		getMovieRequest("", pageNo);
	}, []);

	useEffect(() => {
		if (debouncedSearch) {
			addLoadMoreValue(debouncedSearch);
			getMovieRequest(debouncedSearch, pageNo);
		}
	}, [debouncedSearch]);

	useEffect(() => {
		typeof loadMore === "string"
			? getMovieRequest(loadMore, pageNo)
			: getMoviesByGenre(loadMore, pageNo);
	}, [pageNo]);

	const handleNavigate = (event, route) => {
		route = event.target.textContent.toLowerCase();
		navigateTo(`/${route}`, { state: genre });
	};

	const getGenreRequest = async () => {
		url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.genres) {
			setGenres(responseJson.genres);
		}
	};

	const getMovieRequest = async (debouncedSearch, pageNo) => {
		try {
			setIsLoading(true);
			if (debouncedSearch !== "") {
				addLoadMoreValue(debouncedSearch);
				url = `https://api.themoviedb.org/3/search/movie?page=${pageNo}&query=${debouncedSearch}&include_adult=false&language=en-US&with_original_language=en&api_key=${apiKey}`;
				const response = await fetch(url);
				const responseJson = await response.json();

				if (responseJson.results) {
					const res = responseJson.results.filter((movie) => {
						return movie.backdrop_path !== null;
					});
					setMoviesDisplay({ ...moviesDisplay, movies: res });
					setIsLoading(false);
				}
			} else if (genre === "All") {
				addLoadMoreValue("");
				url = `https://api.themoviedb.org/3/discover/movie?page=${pageNo}&api_key=${apiKey}`;
				const response = await fetch(url);
				const responseJson = await response.json();

				if (responseJson.results) {
					setMoviesDisplay({
						...moviesDisplay,
						movies: responseJson.results.filter((movie) => {
							return movie.backdrop_path !== null;
						}),
					});
					setIsLoading(false);
				}
			}
		} catch (error) {
			setIsLoading(true);
			setInfoText("Error fetching movies...");
		}
	};

	const getMoviesByGenre = async (genreId, pageNo) => {
		try {
			setIsLoading(true);
			addLoadMoreValue(genreId);
			url = `https://api.themoviedb.org/3/discover/movie?page=${pageNo}&with_genres=${genreId}&&api_key=${apiKey}`;
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.results) {
				setMoviesDisplay({
					...moviesDisplay,
					searchValue: "",
					movies: responseJson.results,
				});
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(true);
			setInfoText("Error fetching genres...");
		}
	};

	const isMovieFavorited = (movie) => {
		return favourites.some((fav) => fav.id === movie.id);
	};

	const openModal = (event) => {
		event.preventDefault();
		setIsModalVisible(true);
	};

	const closeModal = () => {
		setIsModalVisible(false);
	};

	const handleCategoryClick = (genreId, genreName) => {
		if (genreId) {
			setGenre(genreName);
			getMoviesByGenre(genreId);
			resetPageNo();
		}
		closeModal();
	};

	const handleSearch = (event) => {
		event.preventDefault();
		if (event.target.value !== "") {
			setMoviesDisplay({ ...moviesDisplay, searchValue: event.target.value });
			setGenre("");
			resetPageNo();
		} else {
			setMoviesDisplay({ ...moviesDisplay, searchValue: "" });
			setGenre("All");
			resetPageNo();
		}
	};

	const loadNextMovies = () => {
		increasePageNo();
	};

	const loadPreviousMovies = () => {
		decreasePageNo();
	};

	const addToFavourites = (movie) => {
		if (isMovieFavorited(movie)) {
			removeFavouriteMovie(movie);
		} else {
			addFavouriteMovie(movie);
		}
	};

	return (
		<div className={isModalVisible ? styles.hidden : styles.movieApp}>
			<Header
				genre={genre}
				genres={genres}
				openModal={openModal}
				closeModal={closeModal}
				isModalVisible={isModalVisible}
				handleCategoryClick={handleCategoryClick}
				searchValue={moviesDisplay.searchValue}
				handleSearch={handleSearch}
				handleNavigate={handleNavigate}
				isSearchAvailable={true}
			/>

			<div className={styles.scrollableContainer}>
				{isLoading && <h2>{infoText}</h2>}
				{!isLoading && (
					<MovieList
						movies={moviesDisplay.movies}
						handleFavouritesClick={addToFavourites}
						favouriteComponent={({ movie }) => {
							return isMovieFavorited(movie) ? (
								<AddedToFavourites
									title={movie.title}
									release={movie.release_date}
								/>
							) : (
								<AddFavourites
									title={movie.title}
									release={movie.release_date}
								/>
							);
						}}
					/>
				)}
			</div>
			{!isLoading && (
				<p className={styles.loadMoreButtons}>
					{pageNo > 1 && <button onClick={loadPreviousMovies}>&#706;</button>}
					<button onClick={loadNextMovies}>&#707;</button>
				</p>
			)}
		</div>
	);
};

export default MoviesPage;
