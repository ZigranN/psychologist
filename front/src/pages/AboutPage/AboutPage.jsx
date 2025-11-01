import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useGesture } from "@use-gesture/react";
import styles from "./AboutPage.module.css";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const AboutPage = () => {
    const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const [isDocsModalOpen, setDocsModalOpen] = useState(false);
    const [docsIndex, setDocsIndex] = useState(0);

    const [autoplay, setAutoplay] = useState(true);

    const location = useLocation();
    const modalImageRef = useRef(null);

    const galleryImages = Array.from({ length: 10 }, (_, i) => `/images/video${i + 1}.jpg`);
    const documentImages = Array.from({ length: 15 }, (_, i) => `/images/educ${i + 1}.jpg`);

    // плавный скролл по якорям
    useEffect(() => {
        if (!location.hash) return;
        const el = document.getElementById(location.hash.slice(1));
        if (el) {
            // небольшой таймаут, чтобы дождаться layout
            setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
        }
    }, [location]);

    // zoom/drag spring
    const [{ scale, x, y }, api] = useSpring(() => ({
        scale: 1, x: 0, y: 0,
        config: { mass: 1, tension: 220, friction: 28 },
    }));

    // жесты для изображения в модалке
    const bind = useGesture(
        {
            onPinch: ({ offset: [d] }) => {
                api.start({ scale: clamp(1 + d / 200, 1, 5) });
            },
            onDrag: ({ offset: [dx, dy] }) => {
                api.start({ x: dx, y: dy });
            },
            onWheel: ({ event }) => {
                // zoom колесом, без прокрутки страницы
                event.preventDefault();
                const next = clamp(scale.get() + event.deltaY * -0.001, 1, 5);
                api.start({ scale: next });
            },
            onDoubleClick: () => {
                // сброс зума двойным тапом/кликом
                api.start({ scale: 1, x: 0, y: 0 });
            },
        },
        { drag: { from: () => [x.get(), y.get()] } }
    );

    // запрет скролла body при открытой модалке
    useEffect(() => {
        const opened = isGalleryModalOpen || isDocsModalOpen;
        const prev = document.body.style.overflow;
        document.body.style.overflow = opened ? "hidden" : "auto";
        return () => { document.body.style.overflow = prev; };
    }, [isGalleryModalOpen, isDocsModalOpen]);

    // ESC закрывает открытые модалки
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") {
                if (isGalleryModalOpen) closeGalleryModal();
                if (isDocsModalOpen) closeDocsModal();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isGalleryModalOpen, isDocsModalOpen]);

    const openGalleryModal = useCallback((index) => {
        setGalleryIndex(index ?? 0);
        setGalleryModalOpen(true);
        setAutoplay(false);
        api.start({ scale: 1, x: 0, y: 0 });
    }, [api]);

    const closeGalleryModal = useCallback(() => {
        setGalleryModalOpen(false);
        setAutoplay(true);
        api.start({ scale: 1, x: 0, y: 0 });
    }, [api]);

    const openDocsModal = useCallback((index = 0) => {
        setDocsIndex(index);
        setDocsModalOpen(true);
        api.start({ scale: 1, x: 0, y: 0 });
    }, [api]);

    const closeDocsModal = useCallback(() => {
        setDocsModalOpen(false);
        api.start({ scale: 1, x: 0, y: 0 });
    }, [api]);

    return (
        <div className={styles.aboutPage}>
            <h1 className={styles.title}>Обо мне</h1>

            <div className={`${styles.media} ${styles.p32} ${styles.shrink}`}>
                <Swiper
                    modules={[Autoplay]}
                    autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
                    speed={800}
                    loop
                    slidesPerView="auto"
                    freeMode
                    className={styles.slider}
                >
                    {galleryImages.map((image, index) => (
                        <SwiperSlide key={index} className={styles.fadeSlide}>
                            <img
                                src={image}
                                alt={`Фото ${index + 1}`}
                                className={styles.slideImage}
                                loading="lazy"
                                decoding="async"
                                width="1200"
                                height="800"
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 600px"
                                onClick={() => openGalleryModal(index)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* Модалка галереи */}
            {isGalleryModalOpen && (
                <div
                    className={styles.modalImageContainer}
                    onMouseDown={(e) => { if (e.currentTarget === e.target) closeGalleryModal(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Просмотр фото"
                >
                    <div className={styles.modalImageContent} onMouseDown={(e) => e.stopPropagation()}>
                        <button className={styles.modalCloseButton} onClick={closeGalleryModal} aria-label="Закрыть">&times;</button>

                        <Swiper
                            modules={[Navigation]}
                            initialSlide={galleryIndex ?? 0}
                            navigation
                            loop
                            spaceBetween={16}
                            className={styles.modalImageSlider}
                        >
                            {galleryImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <animated.img
                                        ref={modalImageRef}
                                        src={img}
                                        alt={`Фото ${index + 1}`}
                                        className={styles.modalImage}
                                        loading="eager"
                                        {...bind()}
                                        style={{ scale, x, y, touchAction: "none" }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {/* Секция "Профессиональная деятельность" */}
            <section className={`${styles.section} ${styles.proff}`}>
                <h2 className={styles.subtitle}>Профессиональная деятельность</h2>

                <div className={styles.proffGrid}>
                    <div className={`${styles.media} ${styles.p34} ${styles.shrink}`}>
                        <picture>
                            <source srcSet="/images/photo2.jpg" type="image/webp" />
                            <img
                                src="/images/photo2.jpg"
                                alt="Салтанат"
                                loading="lazy"
                                decoding="async"
                                className={styles.mediaImg}
                            />
                        </picture>
                    </div>

                    <div>
                        <p>Я работаю со взрослыми и подростками по вопросам:</p>
                        <ul className={styles.list}>
                            <li>Возрастные и духовные кризисы;</li>
                            <li>Психологические травмы;</li>
                            <li>Разрешение эмоциональных блоков и проблемных паттернов поведения;</li>
                            <li>Вопросы выбора и поиска жизненных целей;</li>
                            <li>Более углубленное самопознание;</li>
                            <li>Духовное развитие;</li>
                            <li>Исследование отношений (детско-родительских, супружеских, парных);</li>
                            <li>Экзистенциальные проблемы (одиночество, поиск смысла, поиск своего Я);</li>
                            <li>Развитие осознанности и эмоциональной саморегуляции.</li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* Секция "Образование" */}
            <section className={`${styles.section} ${styles.educ}`} id="education">
                <h2 className={styles.subtitle}>Образование</h2>
                <p>
                    КНУ / Психолог /<br />
                    Гештальт-терапевт / Сертификация по стандартам Европейской Ассоциации Гештальт-терапии.<br />
                    Теория и практика гештальт-терапии / БГИ
                </p>

                <p>Курсы и программы:</p>
                <ul className={styles.list}>
                    <li>Теория и практика гештальт-терапии;</li>
                    <li>Курсы психиатрии и психопатологии;</li>
                    <li>Отношенческий транзактный анализ;</li>
                    <li>Аналитическая психология Юнга;</li>
                    <li>Основы соматологии и психосоматики;</li>
                    <li>Работа с зависимостью;</li>
                    <li>Работа с горем и потерей;</li>
                    <li>Психотерапия для нарциссической динамики;</li>
                    <li>Психопатология характера: новый взгляд на нормы и расстройства.</li>
                </ul>

                <button onClick={() => openDocsModal(0)} className={styles.viewAllButton}>
                    Просмотреть все документы
                </button>
            </section>

            {/* Модалка документов */}
            {isDocsModalOpen && (
                <div
                    className={styles.modalImageContainer}
                    onMouseDown={(e) => { if (e.currentTarget === e.target) closeDocsModal(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Просмотр документов"
                >
                    <div className={styles.modalImageContent} onMouseDown={(e) => e.stopPropagation()}>
                        <button className={styles.modalCloseButton} onClick={closeDocsModal} aria-label="Закрыть">&times;</button>

                        <Swiper
                            modules={[Navigation]}
                            initialSlide={docsIndex ?? 0}
                            navigation
                            loop
                            spaceBetween={16}
                            className={styles.modalImageSlider}
                        >
                            {documentImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <animated.img
                                        ref={modalImageRef}
                                        src={img}
                                        alt={`Документ ${index + 1}`}
                                        className={styles.modalImage}
                                        loading="eager"
                                        {...bind()}
                                        style={{ scale, x, y, touchAction: "none" }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {/* Секция "Мой путь" */}
            <section className={`${styles.section} ${styles.myWay}`} id="myWay">
                <h2 className={styles.subtitle}>Мой путь</h2>
                <div className={styles.content}>
                    <div className={`${styles.media} ${styles.p43} ${styles.shrink}`}>
                        <img
                            src="/images/7.jpg"
                            alt="Мой путь"
                            className={styles.mediaImg}
                            loading="lazy"
                            decoding="async"
                            width="1200"
                            height="900"
                        />
                    </div>

                    <div className={styles.text}>
                        <p>Мне всегда был интересен внутренний мир человека…</p>
                        <p>Проблеск ценного опыта дал импульс к дальнейшему исследованию себя…</p>
                        <p>Психология оказалась необходимым срезом из обширной области знаний…</p>
                        <p>Я желаю делиться своим опытом и получать опыт от вас…</p>
                    </div>
                </div>
            </section>

            {/* Секция "Моя основа в работе" */}
            <section className={styles.section}>
                <h2 className={styles.subtitle}>Моя основа в работе</h2>
                <ul className={styles.list}>
                    <li>Клинический опыт, профессиональные навыки, этический кодекс.</li>
                    <li>Собственный опыт проживания травматических переживаний.</li>
                    <li>Путь духовного развития и становления собой.</li>
                </ul>
                <h3 className={styles.note}>— Конфиденциальность по умолчанию —</h3>
            </section>

            {/* Секция "Моя направленность" */}
            <section className={`${styles.section} ${styles.vector}`}>
                <h2 className={styles.subtitle}>Моя направленность</h2>
                <div className={styles.wrapper}>
                    <img src="/images/photo.jpg" alt="Фон" className={styles.myPhoto} loading="lazy" decoding="async" />
                    <div className={styles.text}>
                        <p>…это поиск целостности и основ духовности…</p>
                        <p>На психологическом уровне это могут быть различные проблемы…</p>
                        <p>Социальные — проблемы отношений и самореализации…</p>
                        <p>Психодуховный аспект включает трансперсональный опыт…</p>
                        <p>Холистический подход: физическое, эмоциональное, ментальное, энергетическое…</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
