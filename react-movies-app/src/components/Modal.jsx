import styles from './Modal.module.css';
import CategoryList from './CategoryList';

const Modal = (props) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalPopover}>
        <div className={styles.containerModal}>
          <p className={styles.modalTitle}>{props.modalTitle}</p>
        </div>
        <hr />
        <CategoryList categories={props.categories} handleCategoryClick={props.handleCategoryClick} />
        <div className={styles.modalFooter}>
          <p onClick={props.onClick} className={styles.closeIcon}>&times;</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
