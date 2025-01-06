import { useState } from "react";
import styles from "./WorkFormat.module.css";

const WorkFormat = () => {
    const [activeTab, setActiveTab] = useState("personal");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        <section className={styles.workFormat}>
            <h2 className={styles.title}>ФОРМАТ МОЕЙ РАБОТЫ</h2>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "personal" ? styles.active : ""}`}
                    onClick={() => handleTabClick("personal")}
                >
                    ЛИЧНЫЕ КОНСУЛЬТАЦИИ
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "group" ? styles.active : ""}`}
                    onClick={() => handleTabClick("group")}
                >
                    ГРУППОВЫЕ КОНСУЛЬТАЦИИ
                </button>
            </div>
            <div className={styles.content}>
                {activeTab === "personal" && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Личная онлайн-сессия</h3>
                        <p className={styles.cardDescription}>
                            Возможность провести сеанс в удобное для вас время и место, не выходя из дома.
                        </p>
                        <div className={styles.icons}>
                            <i className="fab fa-whatsapp"></i>
                            <i className="fab fa-telegram-plane"></i>
                            <i className="fas fa-video"></i>
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className={styles.details}>
                            <span>Длительность: 60 мин</span>
                            <span>Стоимость: 6000 сом</span>
                        </div>
                        <button className={styles.cardButton}>Записаться</button>
                    </div>
                )}

                {activeTab === "personal"  && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Личная встреча</h3>
                        <p className={styles.cardDescription}>
                            Проведение сеанса в уютной обстановке, при личной встрече в городе Бишкек.
                        </p>
                        <div className={styles.icons}>
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className={styles.details}>
                            <span>Длительность: 60 мин</span>
                            <span>Стоимость: 1000 сом</span>
                        </div>
                        <button className={styles.cardButton}>Записаться</button>
                    </div>
                )}

                {activeTab === "group" && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Групповая онлайн-сессия</h3>
                        <p className={styles.cardDescription}>
                            Возможность коллективной работы в формате онлайн-группы.
                        </p>
                        <div className={styles.icons}>
                            <i className="fab fa-whatsapp"></i>
                            <i className="fab fa-telegram-plane"></i>
                            <i className="fas fa-video"></i>
                        </div>
                        <div className={styles.details}>
                            <span>Длительность: 90 мин</span>
                            <span>Стоимость: 3000 сом</span>
                        </div>
                        <button className={styles.cardButton}>Записаться</button>
                    </div>
                )}

                {activeTab === "group"  && (
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Групповая встреча</h3>
                        <p className={styles.cardDescription}>
                            Возможность групповой работы в уютной обстановке в городе Бишкек.
                        </p>
                        <div className={styles.icons}>
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className={styles.details}>
                            <span>Длительность: 90 мин</span>
                            <span>Стоимость: 1500 сом</span>
                        </div>
                        <button className={styles.cardButton}>Записаться</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorkFormat;
