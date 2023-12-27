import React from 'react';
import styles from './SearchBox.module.css';

const SearchBox = (props) => {
	return (
		<div className={styles.searchBox}>
			<input
				className={styles.searchInput}
				value={props.searchValue}
				onChange={props.handleSearch}
				onFocus={(event) => event.currentTarget.value = props.searchValue}
				onBlur={(event) => event.currentTarget.value = props.searchValue}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;
