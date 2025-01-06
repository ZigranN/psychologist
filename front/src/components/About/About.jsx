import React from "react";
import styles from "./About.module.css";

const About = () => (
    <section className={styles.about} id="about">
        <div className={styles.container}>
            <div className={styles.overlay}>
                <div className={styles.text}>
                    <p>
                        КНУ\Психолог Гештальт-терапевт\Сертификация по стандартам Европейской Ассоциации Гештальт-терапии...
                    </p>
                    <p>Регулярно участвую в обучающих программах по психотерапии и прохожу супервизии.</p>
                    <a href="#" className={styles.link}>
                        Посмотреть пройденное обучение
                    </a>
               </div>
            </div>
            <div className={styles.image}>
                <img src="/src/assets/images/5.jpg" alt="Салтанат" />
            </div>
            <div className={styles.methods}>
                <h3>Моя основа в работе</h3>
                <ul>
                    <li>Клинический опыт, профессиональные навыки...</li>
                    <li>Собственный опыт, проживание травматических переживаний...</li>
                    <li>Духовный поиск, тернистый путь становления собой.</li>
                </ul>
                <p className={styles.link}>Нажмите, чтобы узнать подробнее</p>
            </div>
        </div>
    </section>
);

export default About;
