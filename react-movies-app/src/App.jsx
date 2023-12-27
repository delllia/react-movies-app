import React from "react";
import { MoviesContextProvider } from "./context/MoviesContext";
import "./App.css";
import Router from "./routes/Router";

const App = () => {
	return (
		<MoviesContextProvider>
			<Router />
		</MoviesContextProvider>
	);
};

export default App;
