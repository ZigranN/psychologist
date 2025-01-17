import {NavLink, useNavigate} from "react-router-dom";
import { useState } from "react";
import styles from "./WorkFormat.module.css";

const WorkFormat = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleBooking = (sessionType, format) => {
        navigate("/booking", { state: { sessionType, format } });
    };
    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
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
                    <>
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
                            <button
                                className={styles.cardButton}
                                onClick={() => handleBooking("Личная консультация", "Онлайн")}
                            >
                                Записаться
                            </button>
                        </div>
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
                            <button
                                className={styles.cardButton}
                                onClick={() => handleBooking("Личная консультация", "Офлайн")}
                            >
                                Записаться
                            </button>
                        </div>
                    </>
                )}
                {activeTab === "group" && (
                    <div>
                        <div className={styles.theraphy}>
                            <p className={styles.therapyTrigger} onClick={handleModalToggle}>
                                Что дает групповая терапия ?
                            </p>
                        </div>
                        <div className={styles.cardBlock}>
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
                            <button
                                className={styles.cardButton}
                                onClick={() => handleBooking("Групповая консультация", "Онлайн")}
                            >
                                Записаться
                            </button>
                        </div>
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
                            <button
                                className={styles.cardButton}
                                onClick={() => handleBooking("Групповая консультация", "Офлайн")}
                            >
                                Записаться
                            </button>
                        </div>
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={handleModalToggle}>
                                &times;
                            </button>
                            <h2>О групповой терапии</h2>
                            <p>
                                В наши дни групповая терапия пользуется популярностью – растет количество самоактуализирующихся людей, выбирающих ее как способ  для развития осознанности.
                                В групповом процессе заложены уникальные психотерапевтические возможности.
                            </p>
                            <p>
                                В групповом процессе в особой атмосфере осознанности может стать возможным исследование своих стереотипных паттернов, конструирование гибких поведенческих моделей ,
                                а также освоение на практике навыков осознанности и эмоциональной саморегуляции.
                            </p>
                            <p>Это может стать нужной практикой в жизни, которая  расширит границы познания себя и других и может создать мосты настоящей близости к себе и другим.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorkFormat;
