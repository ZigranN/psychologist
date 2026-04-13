import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import styles from "./About.module.css";

const About = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const triggerRef = useRef(null);
    const modalRef = useRef(null);
    const firstFocusableRef = useRef(null);

    const handleClose = useCallback(() => setModalOpen(false), []);
    const handleToggle = useCallback(() => setModalOpen((v) => !v), []);

    useEffect(() => {
        if (!isModalOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const t = setTimeout(() => {
            const target = firstFocusableRef.current || modalRef.current;
            if (target) target.focus();
        }, 0);

        const onKey = (e) => {
            if (e.key === "Escape") {
                handleClose();
                return;
            }

            if (e.key === "Tab" && modalRef.current) {
                const focusables = modalRef.current.querySelectorAll(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );

                if (!focusables.length) return;

                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKey);

        return () => {
            clearTimeout(t);
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;

            if (triggerRef.current) {
                triggerRef.current.focus();
            }
        };
    }, [isModalOpen, handleClose]);

    const onBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const modalMarkup = isModalOpen
        ? createPortal(
            <div
                className={`${styles.modal} ${styles.show}`}
                onMouseDown={onBackdropClick}
                role="presentation"
            >
                <div
                    id="therapy-dialog"
                    ref={modalRef}
                    className={styles.modalContent}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="therapy-title"
                    tabIndex="-1"
                >
                    <button
                        ref={firstFocusableRef}
                        className={styles.closeButton}
                        type="button"
                        aria-label="Закрыть диалог"
                        onClick={handleClose}
                    >
                        &times;
                    </button>

                    <h2 id="therapy-title">Для кого нужна терапия</h2>

                    <p>
                        Психотерапия нужна всем, включая психологов. Только не всякий это понимает.
                        Устаревшие мифы, что она для слабых или психически больных, уже отжили.
                        Психотерапия, прежде всего, нужна как практика развития осознанности и
                        освоения навыков психологической саморегуляции, чтобы не повторять шаблоны
                        усвоенных реакций и моделей поведения в своей семье, прежде всего.
                        <br />
                        <br />
                        Осваивая методы самопомощи, человек обретает ясность и устойчивость и
                        может жить с большим удовлетворением. Быть цельным — это гораздо больше,
                        чем переживать отсутствие болезней. Можно повысить уровень защиты своего
                        здоровья, осваивая здоровую эмоциональную саморегуляцию. Целостное здоровье
                        зависит от того, как каждый человек использует самые обычные и при этом
                        самые действенные инструменты: поддержание психологического баланса,
                        здоровые эмоции, продуктивный образ жизни и различные практики повышения
                        осознанности.
                        <br />
                        <br />
                        Рост и развитие заложены в нас природой и жизненно необходимы для каждого
                        человека для достижения гармонии в отношениях с собой и окружающим миром,
                        для поиска своего места в жизни, осознавания индивидуального жизненного
                        смысла и предназначения, без понимания которых невозможно ощущение полноты
                        жизни. Задача психотерапевтической практики — сделать этот процесс
                        максимально осознанным.
                    </p>

                    <div className={styles.modalActions}>
                        <NavLink to="/booking" className={styles.cta}>
                            Записаться на консультацию
                        </NavLink>
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;

    return (
        <section className={styles.about} id="about" aria-labelledby="about-title">
            <div className={styles.container}>
                <div className={styles.overlay}>
                    <div className={styles.text}>
                        <h2 id="about-title" className={styles.h2}>
                            Обо мне
                        </h2>
                        <p>Дипломированный психолог / КНУ</p>
                        <p>Гештальт-терапевт</p>
                        <p>Сертификация по стандартам</p>
                        <p>Европейской Ассоциации Гештальт-терапии</p>

                        <p>
                            Регулярно участвую в обучающих программах по психотерапии и прохожу
                            супервизии.
                        </p>

                        <NavLink to="/about#education" className={styles.link}>
                            Образование и квалификации ▼
                        </NavLink>
                    </div>
                </div>

                <div className={styles.image}>
                    <picture>
                        <source srcSet="/images/5.jpg" type="image/webp" />
                        <img
                            src="/images/5.jpg"
                            alt="Салтанат"
                            loading="lazy"
                            decoding="async"
                            sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 33vw"
                        />
                    </picture>
                </div>

                <div className={styles.methods}>
                    <h3>Моя основа в работе</h3>
                    <ul>
                        <li>Клинический опыт, профессиональные навыки…</li>
                        <li>Собственный опыт, проживание травматических переживаний…</li>
                        <li>Духовный поиск и путь становления собой.</li>
                    </ul>

                    <NavLink to="/about#myWay" className={styles.link}>
                        Нажмите, чтобы узнать подробнее ▼
                    </NavLink>
                </div>
            </div>

            <div className={styles.therapy}>
                <button
                    ref={triggerRef}
                    type="button"
                    className={styles.therapyTrigger}
                    aria-expanded={isModalOpen}
                    aria-controls="therapy-dialog"
                    onClick={handleToggle}
                >
                    Кому нужна психотерапия? {isModalOpen ? "▲" : "▼"}
                </button>
            </div>

            {modalMarkup}
        </section>
    );
};

export default About;