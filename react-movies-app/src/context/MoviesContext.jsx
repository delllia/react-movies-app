import { createContext, useState } from "react";

const initialContext = {
	favourites: [],
	loadMore: "",
	pageNo: 0,
	addFavourite: () => {},
	removeFavourite: () => {},
	addLoadMoreValue: () => {},
	decreasePageNo: () => {},
	increasePageNo: () => {},
	resetPageNo: () => {},
};

const MoviesContext = createContext(initialContext);

const saveToLocalStorage = (setName, items) => {
	localStorage.setItem(setName, JSON.stringify(items));
};

export const MoviesContextProvider = (props) => {
	const [favourites, setFavourites] = useState([]);
	const [loadMore, setloadMore] = useState("");
	const [pageNo, setPageNo] = useState(1);

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.some((fav) => fav.id === movie.id)
			? favourites
			: [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage("react-movie-app-favourites", newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage("react-movie-app-favourites", newFavouriteList);
	};

	const addLoadMoreValue = (val) => {
		setloadMore(val);
	};

	const increasePageNo = () => {
		setPageNo((val) => val + 1);
	};

	const decreasePageNo = () => {
		setPageNo((val) => val - 1);
	};

	const resetPageNo = () => {
		setPageNo((val) => (val = 1));
	};

	const context = {
		favourites: favourites,
		loadMore: loadMore,
		pageNo: pageNo,
		addFavouriteMovie: addFavouriteMovie,
		removeFavouriteMovie: removeFavouriteMovie,
		addLoadMoreValue: addLoadMoreValue,
		increasePageNo: increasePageNo,
		decreasePageNo: decreasePageNo,
		resetPageNo: resetPageNo,
	};

	return (
		<MoviesContext.Provider value={context}>
			{props.children}
		</MoviesContext.Provider>
	);
};

export default MoviesContext;
