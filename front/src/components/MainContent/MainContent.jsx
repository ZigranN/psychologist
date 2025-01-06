import React from "react";
import styles from "./MainContent.module.css";

const MainContent = () => (
    <main className={styles.main}>
        <div className={styles.contentContainer}>
            <div className={styles.shapeLeft}>
                <div>
                    <p className={styles.subtitle}>ХОЛИСТИЧЕСКАЯ ПСИХОЛОГИЯ</p>
                    <h1 className={styles.title}>САЛТАНАТ ТАГАЕВА</h1>
                    <p>
                        Дипломированный психолог <br />
                        Гештальт-терапевт <br />
                        Интегрированный подход <br />
                        Ассоциированный член ПСАГС
                    </p>
                </div>
                <button className={styles.button}>Записаться</button>
                <p className={styles.stat}>
                    8 из 10 клиентов <span>чувствуют улучшение</span> уже после 1 сеанса
                </p>
            </div>
            <div className={styles.shapeRight}>
                <img
                    src="/src/assets/images/mainST.jpg"
                    alt="Салтанат Тагаева"
                    className={styles.image}
                />
            </div>
        </div>
    </main>
);

export default MainContent;
