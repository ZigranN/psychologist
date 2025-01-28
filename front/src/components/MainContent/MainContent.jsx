import styles from "./MainContent.module.css";
import {NavLink} from "react-router-dom";

const MainContent = () => (
    <main className={styles.main}>
        <div className={styles.contentContainer}>
            <div className={styles.shapeLeft}>
                <div>
                    <p className={styles.title}>ХОЛИСТИЧЕСКАЯ ПСИХОЛОГИЯ</p>
                    <h1 className={styles.subtitle}>САЛТАНАТ ТАГАЕВА</h1>
                    <p className={styles.intro}>
                        Дипломированный психолог <br />
                        Гештальт-терапевт <br />
                        Интегрированный подход <br />
                        Ассоциированный член ПКГА
                    </p>
                </div>

                <NavLink to="/booking" className={styles.button} >Записаться</NavLink>
                <div>
                    <p className={styles.mainText}>
                        Нет ничего, что может произойти с человеком, чего я,
                        будучи тоже человеком, не смогу с ним разделить; нет такого страха, который я не смогу понять;
                        нет страдания, к которому я могу остаться бесчувственным – это заложено в моей человеческой природе.
                        <br />
                        Как бы ни была глубока травма этого человека, этого передо мной не надо стыдиться.
                        <br />
                        Я тоже беззащитен перед лицом травмы.
                        <br />
                        Что бы ни пережил человек, ему не обязательно оставаться с этим наедине.
                        <br />
                        Если выразить и разделить свои чувства, то с этого начинается исцеление.
                        <br />
                    </p>
                    <p className={styles.quoteAuthor}>[Речел Наоми Ремен]</p>
                </div>
            </div>
            <div className={styles.shapeRight}>
                <img
                    src="/images/mainST.jpg"
                    alt="Салтанат Тагаева"
                    className={styles.image}
                />
            </div>
        </div>
    </main>
);

export default MainContent;
