import  { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {articlesData} from "./../../assets/ArticlesData.js";
import styles from "./ArticlesPage.module.css";

const ArticlesPage = () => {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.slice(1);
        if (hash) {
            // Задержка в 100 мс, чтобы убедиться, что элементы уже отрисованы
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            // Если hash отсутствует, скроллим к началу страницы
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location]);

    return (
        <div className={styles.articlesPage}>
            <h1 className={styles.title}>Статьи</h1>
            {articlesData.map((article) => (
                <div key={article.id} id={`${article.id}`} className={styles.article}>
                    <h2 className={styles.articleTitle}>
                        {article.title} или {article.shortText?.toLowerCase()}
                    </h2>

                    <p className={styles.articleText}>{article.fullText}</p>
                </div>
            ))}
        </div>
    );
};

export default ArticlesPage;
