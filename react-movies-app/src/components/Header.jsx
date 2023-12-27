import styles from './Header.module.css';
import MovieListHeading from './MovieListHeading';
import Modal from './Modal';
import SearchBox from './SearchBox';

const Header = (props) => {
 
    return (
        <div className={styles.header}>
				<MovieListHeading heading='Movies'
					genre={props.genre} onClick={props.handleNavigate}
				/>
                <MovieListHeading heading='Favourites' onClick={props.handleNavigate} />
                 {props.moviesGenresSelector}
					{props.isModalVisible && <Modal
											onClick={props.closeModal}
											handleCategoryClick={props.handleCategoryClick}
											modalTitle={'Genres'}
											categories = {props.genres}
										>
										</Modal>}
				{props.isSearchAvailable && <SearchBox searchValue={props.searchValue} handleSearch={props.handleSearch} />}
			</div>)
}

export default Header;