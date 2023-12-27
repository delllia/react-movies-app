import styles from "./CategoryList.module.css";

const CategoryList = (props) => {
	return (
		<>
			{props.categories.map((category, index) => (
				<div
					className={styles.genres}
					onClick={() => props.handleCategoryClick(category.id, category.name)}
					key={index}
				>
					{category.name}
				</div>
			))}
		</>
	);
};

export default CategoryList;
