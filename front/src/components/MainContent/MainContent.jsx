import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainContent.module.css";

// Хук для отслеживания ширины окна
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};

const MainContent = () => {
    const width = useWindowWidth();
    const isMobile = width <= 768; // порог для мобильных устройств

    if (isMobile) {
        return (
            <main className={styles.main}>
                <div className={styles.contentContainer}>
                    {/* Мобильная версия */}
                    <div className={styles.shapeLeft}>
                        <img
                            src="/images/mainST.jpg"
                            alt="Салтанат Тагаева"
                            className={styles.image}
                        />
                        <div>
                            <p className={styles.mainText}>
                                Нет ничего, что может произойти с человеком, чего я,
                                будучи тоже человеком, не смогу с ним разделить; нет такого страха, который я не смогу понять;
                                нет страдания, к которому я могу остаться бесчувственным – это заложено в моей человеческой
                                природе.
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
                    <div className={styles.shapeLeft}>
                        <div className={styles.box}>
                            <p className={styles.intro}>
                                Дипломированный психолог <br />
                                Гештальт-терапевт <br />
                                Интегрированный подход <br />
                                Ассоциированный член <br />
                                <span>ПСАГС/ПКГА</span>
                            </p>
                        </div>
                        <NavLink to="/booking" className={styles.button}>
                            Записаться
                        </NavLink>
                    </div>
                </div>
            </main>
        );
    } else {
        return (
            <main className={styles.main}>
                <div className={styles.contentContainer}>
                    {/* Десктопная версия */}
                    <div className={styles.shapeLeft}>
                        <img
                            src="/images/mainST.jpg"
                            alt="Салтанат Тагаева"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.shapeLeft}>
                        <div className={styles.box}>
                            <p className={styles.intro}>
                                Дипломированный психолог <br />
                                Гештальт-терапевт <br />
                                Интегрированный подход <br />
                                Ассоциированный член <br />
                                <span>ПСАГС/ПКГА</span>
                            </p>
                        </div>
                        <NavLink to="/booking" className={styles.button}>
                            Записаться
                        </NavLink>
                        <div>
                            <p className={styles.mainText}>
                                Нет ничего, что может произойти с человеком, чего я,
                                будучи тоже человеком, не смогу с ним разделить; нет такого страха, который я не смогу понять;
                                нет страдания, к которому я могу остаться бесчувственным – это заложено в моей человеческой
                                природе.
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
                </div>
            </main>
        );
    }
};

export default MainContent;
