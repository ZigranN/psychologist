import React from "react";
import styles from "./Certificates.module.css";

const Certificates = () => (
    <section className={styles.certificates}>
        <h2 className={styles.title}>ДИПЛОМЫ И СЕРТИФИКАТЫ</h2>
        <p className={styles.subtitle}>МОИ ЗНАНИЯ - ЭТО КЛЮЧ К СЧАСТЛИВОЙ ЖИЗНИ ДРУГИХ</p>
        <div className={styles.content}>
            <div
                className={styles.card}
                onClick={() => openModal("/images/certificate1.jpg")}
            >
                <div className={styles.cardIcon}>
                    <i className="fas fa-file-pdf"></i>
                </div>
                <h3 className={styles.cardTitle}>СЕРТИФИКАТ</h3>
                <p className={styles.cardDescription}>
                    «Теория семейных систем по Мюррею Боуэну»
                </p>
                <span className={styles.cardLink}>ОТКРЫТЬ</span>
            </div>
            <div
                className={styles.card}
                onClick={() => openModal("/images/certificate2.jpg")}
            >
                <div className={styles.cardIcon}>
                    <i className="fas fa-file-pdf"></i>
                </div>
                <h3 className={styles.cardTitle}>ДИПЛОМ</h3>
                <p className={styles.cardDescription}>о высшем образовании психолога</p>
                <span className={styles.cardLink}>ОТКРЫТЬ</span>
            </div>
            <div className={styles.info}>
                <h3>КУРСЫ, КОТОРЫЕ Я ПРОШЛА:</h3>
                <ul>
                    <li>Теория семейных систем по Мюррею Боуэну</li>
                    <li>Основы психиатрии для специалистов помогающих профессий</li>
                    <li>Метод системной расстановки для семейной психотерапии</li>
                    <li>Супружеское консультирование</li>
                </ul>
            </div>
        </div>
        <button className={styles.button}>Записаться</button>
    </section>
);

function openModal(imageSrc) {
    const modal = document.getElementById("modal2");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imageSrc;
    modal.style.display = "flex";
}

export default Certificates;
