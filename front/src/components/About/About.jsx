import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const triggerRef = useRef(null);        // кнопка/триггер
    const modalRef = useRef(null);          // контейнер модалки
    const firstFocusableRef = useRef(null); // первый фокус внутри

    const handleOpen = useCallback(() => setModalOpen(true), []);
    const handleClose = useCallback(() => setModalOpen(false), []);
    const handleToggle = useCallback(() => setModalOpen(v => !v), []);

    // Блокируем скролл body и настраиваем фокус/ESC
    useEffect(() => {
        if (isModalOpen) {
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            // перенос фокуса внутрь
            const t = setTimeout(() => {
                (firstFocusableRef.current || modalRef.current)?.focus();
            }, 0);

            // обработчик ESC
            const onKey = (e) => {
                if (e.key === "Escape") handleClose();
                if (e.key === "Tab" && modalRef.current) {
                    // простая таб-ловушка
                    const focusables = modalRef.current.querySelectorAll(
                        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                    );
                    const first = focusables[0];
                    const last = focusables[focusables.length - 1];
                    if (!first || !last) return;
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault(); last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault(); first.focus();
                    }
                }
            };
            document.addEventListener("keydown", onKey);

            return () => {
                clearTimeout(t);
                document.removeEventListener("keydown", onKey);
                document.body.style.overflow = prevOverflow;
                // возвращаем фокус на триггер
                triggerRef.current?.focus();
            };
        }
    }, [isModalOpen, handleClose]);

    // Закрытие по клику на подложку
    const onBackdropClick = (e) => {
        if (e.currentTarget === e.target) handleClose();
    };

    return (
        <section className={styles.about} id="about" aria-labelledby="about-title">
            <div className={styles.container}>
                {/* Текстовая карточка */}
                <div className={styles.overlay}>
                    <div className={styles.text}>
                        <h2 id="about-title" className={styles.h2}>
                            Обо мне
                        </h2>
                        <p>
                            Дипломированный психолог / КНУ
                        </p>
                        <p>
                            Гештальт-терапевт
                        </p>
                        <p>
                            Сертификация по стандартам
                        </p>
                        <p>
                            Европейской Ассоциации Гештальт-терапии
                        </p>

                        <p>
                            Регулярно участвую в обучающих программах по психотерапии и
                            прохожу супервизии.
                        </p>
                        <NavLink to="/about#education" className={styles.link}>
                            Образование и квалификации ▼
                        </NavLink>
                    </div>
                </div>

                {/* Картинка: webp + jpg */}
                <div className={styles.image}>
                    <picture>
                        <source
                            srcSet="/images/5.jpg"
                            type="image/webp"
                        />
                        <img
                            src="/images/5.jpg"
                            alt="Салтанат"
                            loading="lazy"
                            decoding="async"
                            sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 33vw"
                        />
                    </picture>
                </div>

                {/* Методы */}
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

            {/* Триггер секции “Кому нужна психотерапия?” */}
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

            {/* Модалка */}
            {isModalOpen && (
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
                        tabIndex={-1}
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
                            Психотерапия нужна всем нам. Устаревшие мифы, что она для слабых
                            или психически больных, уже отжили. Психотерапия, прежде всего,
                            нужна как практика развития осознанности и освоения навыков
                            психологической саморегуляции, чтобы не повторять шаблоны
                            усвоенных реакций и моделей поведения из окружающей среды —
                            прежде всего, семьи и детско-родительских отношений.
                        </p>
                        <p>
                            Осваивая методы самопомощи, человек обретает ясность и
                            устойчивость и может жить с большим удовлетворением. Задача
                            психотерапевтической практики — сделать этот процесс максимально
                            осознанным.
                        </p>
                        <div className={styles.modalActions}>
                            <NavLink to="/booking" className={styles.cta}>
                                Записаться на консультацию
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
