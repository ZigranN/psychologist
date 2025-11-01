import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainContent.module.css";

// Безопасный хук ширины окна (SSR-safe)
const useWindowWidth = () => {
    const [width, setWidth] = useState(
        typeof window === "undefined" ? 1024 : window.innerWidth
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};

const MainContent = () => {
    const width = useWindowWidth();
    const isMobile = width <= 768;

    return (
        <main className={styles.main} role="main">
            <div className={styles.contentContainer}>
                {/* Левая/текстовая карточка */}
                {isMobile ? (
                    <>
                        <section className={styles.card}>
                            <div className={styles.box}>
                                <p className={styles.intro}>
                                    Дипломированный психолог <br />
                                    Экзистенциальный гештальт-терапевт <br />
                                    Интегрированный подход <br />
                                    Ассоциированный член <br />
                                    <span>ПСАГС/ПКГА</span>
                                </p>
                            </div>

                            <NavLink to="/booking" className={styles.button} aria-label="Записаться на консультацию">
                                Записаться
                            </NavLink>
                        </section>

                        {/* Правая/портретная карточка */}
                        <section className={styles.card}>
                            <figure className={styles.imageFrame}>
                                <img
                                    src="/images/mainST.jpg"
                                    alt="Салтанат Тагаева"
                                    className={styles.imageEl}
                                    loading="lazy"
                                    decoding="async"
                                    sizes="(max-width: 768px) 92vw, 40vw"
                                />
                            </figure>

                            <blockquote className={styles.mainText}>
                                Нет ничего, что может произойти с человеком, чего я, будучи тоже
                                человеком, не смогу с ним разделить; нет такого страха, который я
                                не смогу понять; нет страдания, к которому я могу остаться
                                бесчувственным – это заложено в моей человеческой природе.
                                <br />
                                Как бы ни была глубока травма этого человека, этого передо мной не
                                надо стыдиться. <br />
                                Я тоже беззащитен перед лицом травмы. <br />
                                Что бы ни пережил человек, ему не обязательно оставаться с этим
                                наедине. <br />
                                Если выразить и разделить свои чувства, то с этого начинается
                                исцеление.
                            </blockquote>
                            <cite className={styles.quoteAuthor}>[Рейчел Наоми Ремен]</cite>
                        </section>
                    </>
                ) : (
                    <>
                        {/* Desktop: 2 колонки */}
                        <section className={styles.card}>
                            <figure className={styles.imageFrame}>
                                <img
                                    src="/images/mainST.jpg"
                                    alt="Салтанат Тагаева"
                                    className={styles.imageEl}
                                    loading="lazy"
                                    decoding="async"
                                    sizes="(max-width: 768px) 92vw, 40vw"
                                />
                            </figure>
                        </section>

                        <section className={styles.card}>
                            <div className={styles.box}>
                                <p className={styles.intro}>
                                    Дипломированный психолог <br />
                                    Экзистенциальный гештальт-терапевт <br />
                                    Интегрированный подход <br />
                                    Ассоциированный член <br />
                                    <span>ПСАГС/ПКГА</span>
                                </p>
                            </div>

                            <NavLink to="/booking" className={styles.button} aria-label="Записаться на консультацию">
                                Записаться
                            </NavLink>

                            <blockquote className={styles.mainText}>
                                Нет ничего, что может произойти с человеком, чего я, будучи тоже
                                человеком, не смогу с ним разделить; нет такого страха, который я
                                не смогу понять; нет страдания, к которому я могу остаться
                                бесчувственным – это заложено в моей человеческой природе.
                                <br />
                                Как бы ни была глубока травма этого человека, этого передо мной не
                                надо стыдиться. <br />
                                Я тоже беззащитен перед лицом травмы. <br />
                                Что бы ни пережил человек, ему не обязательно оставаться с этим
                                наедине. <br />
                                Если выразить и разделить свои чувства, то с этого начинается
                                исцеление.
                            </blockquote>
                            <cite className={styles.quoteAuthor}>[Рейчел Наоми Ремен]</cite>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
};

export default MainContent;
