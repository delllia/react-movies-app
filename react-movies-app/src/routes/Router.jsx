import { Route, Routes } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import FavouritesPage from "../pages/FavouritesPage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
    );
};

export default Router;