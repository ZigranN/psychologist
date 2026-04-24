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
    const documentImages = Array.from({ length: 16 }, (_, i) => `/images/educ${i + 1}.jpg`);

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
                        <p>Я работаю со взрослыми и подростками в вопросах :</p>
                        <ul className={styles.list}>
                            <li>более углубленного самопознания; </li>
                            <li>возрастных и духовных кризисов;</li>
                            <li>психологических травм;</li>
                            <li>освобождения от эмоциональных блоков и проблемных паттернов поведения;</li>
                            <li>эмоциональной саморегуляции;</li>
                            <li>поддержания жизненного баланса;</li>
                            <li>исследования отношений (детско-родительских, супружеских, парных);</li>
                            <li>целей и жизненных направлений;</li>
                            <li>экзистенциальных проблем( одиночества, смысложизненности, духовного развития и поиска своего Я);</li>
                            <li>развития осознанности;</li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* Секция "Образование" */}
            <section className={`${styles.section} ${styles.educ}`} id="education">
                <h2 className={styles.subtitle}>Образование</h2>
                <p>
                    КНУ / Психолог /<br />
                    Гештальт-терапевт\Сертификация по стандартам<br />
                    Европейской Ассоциации Гештальт-терапии. Теория и практика гештальт терапии\БГИ<br/>
                    Курсы психиатрии и психопатологии;<br/>
                    Экзистенциальный подход в гештальт терапии; <br/>
                    Отношенческий транзактный анализ; <br/>
                    Аналитическая психология Юнга; <br/>
                    Основы соматологии и психосоматики; <br/>
                    Работа с зависимостью; <br/>
                    Работа с горем и потерей; <br/>
                    Основы соматологии и психосоматики; <br/>
                    Психотерапия для нарциссической динамики; <br/>
                    Психопатология характера: новый взгляд на нормы и расстройства.

                </p>
                <p>включая,
                    -часы личной терапии, семинаров и профессиональных конференций, супервизий, множество часов клинической практики и ведения учебно -терапевтических групповых занятий</p>
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
                            height={"1500px" }
                        />
                    </div>

                    <div className={styles.text}>
                        <p>Мне всегда был интересен внутренний мир человека. И меня с ранних лет занимали вопросы духовного поиска. Много лет я искала ответы на свои вопросы в различных источниках восточной философии. Спонтанно пережив  трансцендентный опыт, я осознала насколько мы малы в своём неведении и  велики в просторах нашей целостности. Проблеск этого ценного опыта дал мне импульс к дальнейшему исследованию себя. Я встала на путь духовных практик и сделала это регулярной основой своей жизни. Со временем я поняла, что это постепенный процесс глубинных внутренних преобразований, избавляющий от всех не нужных и разрушаюших моделей поведения.
                            Психология оказалась необходимым срезом из обширной области эзотерических знаний. Сейчас, в наше время, когда психология и духовность смыкаются, эта профессия стала для меня очень интересна.
                            Я желаю делиться своим опытом и получать опыт от вас, постоянно расширяя и углубляя знания о нашей внутренней природе и душе. Я знаю, что самой основой нашей жизни, любого нашего движения и развития является духовная основа. И что если мы хотим быть целостными, наполненными и гармоничными, то нам следует развивать себя и в  личностном, и в духовном аспекте.
                        </p>

                    </div>
                </div>
            </section>

            {/* Секция "Моя основа в работе" */}
            <section className={styles.section}>
                <h2 className={styles.subtitle}>Моя основа в работе</h2>
                <ul className={styles.list}>
                    <li>...это мой клинический опыт,  усвоенный этический кодекс, профессиональные навыки и
                        опора на качественное профессиональное обучение.</li>
                    <li>...это также мой собственный опыт, пусть проживания травматических переживаний, проблемных паттернов, над которыми я работала и продолжаю работать.</li>
                    <li>... эмой духовный поиск, длинный тернистый путь становления собой.</li>
                </ul>
                <h3 className={styles.note}>— Конфиденциальность по умолчанию —</h3>
            </section>

            {/* Секция "Моя направленность" */}
            <section className={`${styles.section} ${styles.vector}`}>
                <h2 className={styles.subtitle}>Моя направленность</h2>
                <div className={styles.wrapper}>
                    <img src="/images/photo.jpg" alt="Фон" className={styles.myPhoto} loading="lazy" decoding="async" />
                    <div className={styles.text}>
                       <p>... это поиск целостности и основ духовности, прежде всего. Я нахожу очень важным в исследовании состояния человека и всего спектра его переживаний учитывать все слои и уровни сознания. И подходить не только на индивидуально-психологическом, социальном уровне, но и психодуховном, развивать себя «на всех этажах».

                           На индивидуально-психологическом это могут быть самые различные проблемы, начиная от расстройств пищевого поведения, зависимостей, депрессий , панических атак, тревожных расстройств, проблем с подавленной или неконтролируемой агрессией, внутренней пустоты и др.

                           Социальные это могут быть различные проблемы отношений и самореализации.

                           Проблемы психодуховного аспекта относятся к наименее исследованным или ненаучным, и, к сожалению, не рассматриваются на должном уровне.   Существует целая обширная область, включающая траснперсональный опыт, духовные прозрения, духовные кризисы, необычные состояния, трансцендентные переживания, которые влияют на психологическое состояние человека и выражаются иногда в кратких психотических эпизодах или временном состоянии дезориентации. В клинической психиатрии принято относить непонятный опыт к психическим расстройствам.
                           Многие люди страдают от невозможности поделиться пугающим опытом и замыкаются.

                           Мой личный опыт заставил меня обратиться к поиску многочисленных вопросов,встающих на этом пути и мне глубоко интересно такое направление в психологии, как трансперсональная или интегративная, ,основателями которого выступали такие известные философы  психологи  как У Джеймс,К.Г. Юнг, Р Ассаджиоли,А Маслоу,К Уилбер и другие.

                           В своем подходе я делаю акцент на развитии осознанности и считаю, что это единственный путь внутренней трансформации и обретения душевного покоя.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
