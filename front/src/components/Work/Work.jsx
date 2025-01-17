import  { useState } from "react";
import Modal from "../Modal/Modal";
import {articlesData} from "./../../assets/ArticlesData.js";
import styles from "./Work.module.css";

const Work = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);

    const openModal = (article) => {
        setCurrentArticle(article);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentArticle(null);
    };

    return (
        <section className={styles.work}>
            <h2 className={styles.title}>Лишь некоторые запросы на терапию : </h2>
            <div className={styles.tags}>
                {articlesData.map((article) => (
                    <button
                        key={article.id}
                        className={styles.tag}
                        onClick={() => openModal(article)}
                    >
                        {article.title}
                    </button>
                ))}
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title={currentArticle.title}
                    content={currentArticle.shortText}
                    articleId={currentArticle.id}
                    onClose={closeModal}
                />
            )}
        </section>
    );
};

export default Work;
