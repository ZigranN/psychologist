import {useState} from "react";
import styles from "./About.module.css";
import {NavLink} from "react-router-dom";

const About = () => {
    const [isModalOpen, setModalOpen] = useState(false);


    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <div className={styles.overlay}>
                    <div className={styles.text}>
                        <p>
                            Дипломированный психолог / КНУ <br/>
                            Гештальт-терапевт/ <br/>
                            Сертификация по стандартам <br/>
                            Европейской Ассоциации Гештальт-терапии
                        </p>
                        <p>Регулярно участвую в обучающих программах по психотерапии и прохожу супервизии.</p>
                        <NavLink to="/about#education" className={styles.link}>
                            Образование и квалификации ▼
                        </NavLink>
                    </div>
                </div>
                <div className={styles.image}>
                    <img src="/images/5.jpg" alt="Салтанат"/>
                </div>
                <div className={styles.methods}>
                    <h3>Моя основа в работе</h3>
                    <ul>
                        <li>Клинический опыт, профессиональные навыки...</li>
                        <li>Собственный опыт, проживание травматических переживаний...</li>
                        <li>Духовный поиск и путь становления собой.</li>
                    </ul>
                    <NavLink to="/about#myWay" className={styles.link}>
                        Нажмите, чтобы узнать подробнее ▼
                    </NavLink>
                </div>

            </div>
            <div className={styles.theraphy}>
                <h5 className={styles.therapyTrigger} onClick={handleModalToggle}>
                    Кому нужна психотерапия? {isModalOpen ? "▲" : "▼"}
                </h5>
            </div>
            {isModalOpen && (
                <div className={`${styles.modal} ${isModalOpen ? styles.show : ""}`}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleModalToggle}>
                            &times;
                        </button>
                        <h2>Для кого нужна терапия</h2>
                        <p>
                            Психотерапия нужна всем нам. Устаревшие мифы, что она для слабых или психически больных, уже отжили.
                            Психотерапия, прежде всего, нужна как практика развития осознанности и освоения навыков
                            психологической саморегуляции для того, чтобы не повторять шаблоны усвоенных реакций и моделей
                            поведения из окружающей среды, прежде всего, своей семьи и детско-родительских отношений.
                        </p>
                        <p>
                            Осваивая методы самопомощи, человек обретает ясность и устойчивость и может жить вместе с этим с большим
                            удовлетворением. Задача психотерапевтической практики – сделать этот процесс максимально осознанным.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
