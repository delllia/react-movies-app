import React from "react";
import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
	return (
		<div className={styles.cardContainer}>
			<h5 className={styles.cardHeader}>
				{props.title} &#10022; {props.release}
			</h5>
			<div className={styles.imageContainer}>
				<img src={props.path} alt="movie"></img>
				<div onClick={props.onClick} className={styles.overlay}>
					{props.footer}
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
