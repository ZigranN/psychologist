import {NavLink} from "react-router-dom";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";


const Modal = ({ isOpen, title, content, articleId, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✖
                </button>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{content}</p>
                <NavLink to={`/articles#${articleId}`} className={styles.detailsButton}>
                    Подробнее
                </NavLink>
            </div>
        </div>
    );
};
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
