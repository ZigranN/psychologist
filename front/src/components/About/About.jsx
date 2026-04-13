import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import styles from "./About.module.css";

const modalContentMap = {
    therapy: {
        title: "Для кого нужна терапия",
        text: (
            <>
                <p>
                    Психотерапия нужна всем, включая психологов. Только не всякий это понимает.
                    Устаревшие мифы, что она для слабых или психически больных, уже отжили.
                    Психотерапия, прежде всего, нужна как практика развития осознанности и
                    освоения навыков психологической саморегуляции, чтобы не повторять шаблоны
                    усвоенных реакций и моделей поведения в своей семье, прежде всего.
                </p>

                <p>
                    Осваивая методы самопомощи, человек обретает ясность и устойчивость и
                    может жить с большим удовлетворением. Быть цельным — это гораздо больше,
                    чем переживать отсутствие болезней. Можно повысить уровень защиты своего
                    здоровья, осваивая здоровую эмоциональную саморегуляцию. Целостное здоровье
                    зависит от того, как каждый человек использует самые обычные и при этом
                    самые действенные инструменты: поддержание психологического баланса,
                    здоровые эмоции, продуктивный образ жизни и различные практики повышения
                    осознанности.
                </p>

                <p>
                    Рост и развитие заложены в нас природой и жизненно необходимы для каждого
                    человека для достижения гармонии в отношениях с собой и окружающим миром,
                    для поиска своего места в жизни, осознавания индивидуального жизненного
                    смысла и предназначения, без понимания которых невозможно ощущение полноты
                    жизни. Задача психотерапевтической практики — сделать этот процесс
                    максимально осознанным.
                </p>
            </>
        ),
    },
    selfKnowledge: {
        title: "Для чего нужна психотерапия",
        text: (
            <>
                <p>
                    Наша личность составляет комбинацию генетической информации родителей и рода
                    со своей уникальной комбинацией нервных связей. Через поведенческие,
                    эмоциональные особенности родителей мы наследуем паттерны нервных сетей.
                </p>

                <p>
                    Генетические нейронные связи являются не более чем платформой, на которой
                    мы можем создавать свою личность. Когда мы узнаем новые знания и осваиваем
                    новый опыт, то создаем новые нейронные связи.
                </p>

                <p>
                    Не осваивая знаний и опыта, мы ограничиваем генетику, поскольку активируем
                    только те цепи, которые достались нам по генетической памяти.
                </p>

                <p>
                    Новые знания — это не только интеллектуальная информация, а знание о себе,
                    самопознание: какой я, каким или какой проявляюсь, что мне мешает, каким
                    я хочу быть или выражать себя, и что для этого мне нужно, какие навыки
                    мне нужно для этого развить.
                </p>

                <p>
                    Психотерапия как психологическая практика помогает нам осознать свои привычные
                    паттерны поведения, которые мешают жить более плодотворно, и развить
                    способность принимать ответственность за то, как человек сам создает свой опыт.
                </p>

                <p>
                    Она предназначена не только для тех, кто страдает психологическими или
                    психосоматическими расстройствами, но и для тех, кто желает познавать себя
                    и жить более осознанно.
                </p>

                <p>
                    Новое знание и опыт можно осваивать в психологической практике.
                </p>
            </>
        ),
    },
};

const About = () => {
    const [activeModal, setActiveModal] = useState(null);
    const modalRef = useRef(null);
    const firstFocusableRef = useRef(null);
    const lastTriggerRef = useRef(null);

    const openModal = useCallback((modalKey, event) => {
        lastTriggerRef.current = event.currentTarget;
        setActiveModal(modalKey);
    }, []);

    const handleClose = useCallback(() => {
        setActiveModal(null);
    }, []);

    useEffect(() => {
        if (!activeModal) return;

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

            if (lastTriggerRef.current) {
                lastTriggerRef.current.focus();
            }
        };
    }, [activeModal, handleClose]);

    const onBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const currentModal = activeModal ? modalContentMap[activeModal] : null;

    const modalMarkup =
        activeModal && currentModal
            ? createPortal(
                <div
                    className={`${styles.modal} ${styles.show}`}
                    onMouseDown={onBackdropClick}
                    role="presentation"
                >
                    <div
                        id={`dialog-${activeModal}`}
                        ref={modalRef}
                        className={styles.modalContent}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`title-${activeModal}`}
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

                        <h2 id={`title-${activeModal}`}>{currentModal.title}</h2>

                        <div className={styles.modalText}>
                            {currentModal.text}
                        </div>

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
                    type="button"
                    className={styles.therapyTrigger}
                    aria-expanded={activeModal === "therapy"}
                    aria-controls="dialog-therapy"
                    onClick={(e) => openModal("therapy", e)}
                >
                    Кому нужна психотерапия? {activeModal === "therapy" ? "▲" : "▼"}
                </button>

                <button
                    type="button"
                    className={styles.therapyTrigger}
                    aria-expanded={activeModal === "selfKnowledge"}
                    aria-controls="dialog-selfKnowledge"
                    onClick={(e) => openModal("selfKnowledge", e)}
                >
                    Для чего нужна психотерапия {activeModal === "selfKnowledge" ? "▲" : "▼"}
                </button>
            </div>

            {modalMarkup}
        </section>
    );
};

export default About;