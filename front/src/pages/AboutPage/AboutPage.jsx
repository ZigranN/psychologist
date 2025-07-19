import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useGesture } from "@use-gesture/react";
import styles from "./AboutPage.module.css";


const AboutPage = () => {
    const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(null);
    const [isDocsModalOpen, setDocsModalOpen] = useState(false);
    const [docsIndex, setDocsIndex] = useState(null);
    const [autoplay, setAutoplay] = useState(true);
    const location = useLocation();
    const modalImageRef = useRef(null);

    const galleryImages = Array.from({ length: 10 }, (_, index) => `/images/video${index + 1}.jpg`);
    const documentImages = Array.from({ length: 15 }, (_, index) => `/images/educ${index + 1}.jpg`);

    // Плавный скролл по якорям
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 5);
            }
        }
    }, [location]);

    // Анимации для zoom / drag
    const [{ scale, x, y }, api] = useSpring(() => ({
        scale: 1,
        x: 0,
        y: 0,
        config: { mass: 1, tension: 200, friction: 30 },
    }));

    const bind = useGesture({
        onPinch: ({ offset: [d] }) => {
            void api.start({ scale: Math.max(1, Math.min(5, 1 + d / 200)) });
        },
        onDrag: ({ offset: [dx, dy] }) => {
            void api.start({ x: dx, y: dy });
        },
        onWheel: ({ event }) => {
            event.preventDefault();
            const newScale = Math.max(1, Math.min(scale.get() + event.deltaY * -0.001, 5));
            void api.start({ scale: newScale });
        },
    });


    useEffect(() => {
        if (isGalleryModalOpen || isDocsModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isGalleryModalOpen, isDocsModalOpen]);

    const openGalleryModal = (index) => {
        setGalleryIndex(index);
        setGalleryModalOpen(true);
        setAutoplay(false);
    };

    const closeGalleryModal = () => {
        setGalleryModalOpen(false);
        setGalleryIndex(null);
        setAutoplay(true);
        api.start({ scale: 1, x: 0, y: 0 });
    };

    const openDocsModal = (index) => {
        setDocsIndex(index);
        setDocsModalOpen(true);
    };

    const closeDocsModal = () => {
        setDocsModalOpen(false);
        setDocsIndex(null);
        api.start({ scale: 1, x: 0, y: 0 });
    };

    return (
        <div className={styles.aboutPage}>
            <h1 className={styles.title}>Обо мне</h1>

            <Swiper
                modules={[Autoplay]}
                autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
                speed={2000}
                loop
                slidesPerView="auto"
                freeMode={true}
                className={styles.slider}
            >
                {galleryImages.map((image, index) => (
                    <SwiperSlide key={index} className={styles.fadeSlide}>
                        <img
                            src={image}
                            alt={`Фото ${index + 1}`}
                            className={styles.slideImage}
                            onClick={() => openGalleryModal(index)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {isGalleryModalOpen && (
                <div className={styles.modalImageContainer} onClick={closeGalleryModal}>
                    <div className={styles.modalImageContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalImageCloseButton} onClick={closeGalleryModal}>
                            &times;
                        </button>
                        <Swiper
                            modules={[Navigation]}
                            initialSlide={galleryIndex}
                            navigation
                            loop
                            spaceBetween={20}
                            className={styles.modalImageSlider}
                        >
                            {galleryImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <animated.img
                                        ref={modalImageRef}
                                        src={img}
                                        alt={`Фото ${index + 1}`}
                                        className={styles.modalImage}
                                        {...bind()}
                                        style={{ scale, x, y, touchAction: "none" }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {isDocsModalOpen && (
                <div className={styles.modalImageContainer} onClick={closeDocsModal}>
                    <div className={styles.modalImageContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalImageCloseButton} onClick={closeDocsModal}>
                            &times;
                        </button>
                        <Swiper
                            modules={[Navigation]}
                            initialSlide={docsIndex}
                            navigation
                            loop
                            spaceBetween={20}
                            className={styles.modalImageSlider}
                        >
                            {documentImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <animated.img
                                        ref={modalImageRef}
                                        src={img}
                                        alt={`Документ ${index + 1}`}
                                        className={styles.modalImage}
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
                <div className={styles.proffdiv}>
                    <img
                        src="/images/photo2.jpg"
                        alt="Салтанат"
                        className={styles.proffImage} // новый класс для float
                    />
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
                            <li>Экзистенциальные проблемы (одиночество, смысложизненность, поиск своего Я);</li>
                            <li>Развитие осознанности и эмоциональной саморегуляции.</li>
                        </ul>

                    </div>
                    {/* Очистка float */}
                    <div style={{clear: 'both'}}></div>
                </div>
            </section>


            {/* Секция "Образование" */}
            <section className={`${styles.section} ${styles.educ}`} id="education">
                <h2 className={styles.subtitle}>Образование</h2>
                <p>
                    КНУ / Психолог /<br/>
                    Гештальт-терапевт / Сертификация по стандартам Европейской Ассоциации Гештальт-терапии.<br/>
                    Теория и практика гештальт-терапии / БГИ
                </p>
                <p>Курсы и программы:</p>
                <ul className={styles.list}>
                    <li>Теория и практика гештальт терапии;</li>
                    <li>Курсы психиатрии и психопатологии;</li>
                    <li>Отношенческий транзактный анализ;</li>
                    <li>Аналитическая психология Юнга;</li>
                    <li>Основы соматологии и психосоматики;</li>
                    <li>Работа с зависимостью;</li>
                    <li>Работа с горем и потерей;</li>
                    <li>Психотерапия для нарцисса;</li>
                    <li>Психопотология характера / Новый опыт и знания о психической сфере в норме и патологии</li>
                </ul>
                <button onClick={() => openDocsModal()} className={styles.viewAllButton}>
                    Просмотреть все документы
                </button>
            </section>

            {/* Секция "Мой путь" */}
            <section className={`${styles.section} ${styles.myWay}`} id="myWay">
                <h2 className={styles.subtitle}>Мой путь</h2>
                <div className={styles.content}>
                    <img src="/images/7.jpg" alt="Мой путь" className={styles.myPhoto}/>
                    <div className={styles.text}>
                        <p>
                            Мне всегда был интересен внутренний мир человека. И меня с ранних лет занимали вопросы
                            духовного поиска.
                            Много лет я искала ответы на свои вопросы в различных источниках восточной философии.
                            Спонтанно пережив
                            трансцендентный опыт, я осознала, насколько мы малы в своём неведении и велики в просторах
                            нашей целостности.
                        </p>
                        <p>
                            Проблеск этого ценного опыта дал мне импульс к дальнейшему исследованию себя.
                            Я встала на путь духовных практик и сделала это регулярной основой своей жизни.
                            Со временем я поняла, что это постепенный процесс
                            глубинных внутренних преобразований, избавляющий от всех не нужных и разрушающих моделей
                            поведения.
                        </p>
                        <p>
                            Психология оказалась необходимым срезом из обширной области эзотерических знаний.
                            Сейчас, в наше время, когда психология и духовность смыкаются, эта профессия стала для меня
                            очень интересна.
                        </p>
                        <p>
                            Я желаю делиться своим опытом и получать опыт от вас, углубляя знания о нашей внутренней
                            природе и душе.

                        </p>
                    </div>
                </div>
            </section>

            {/* Секция "Моя основа в работе" */}
            <section className={styles.section}>
                <h2 className={styles.subtitle}>Моя основа в работе</h2>
                <ul className={styles.list}>
                    <li>
                        ... это мой клинический опыт, профессиональные навыки, усвоенный этический кодекс ,опора на
                        качественное профессиональное обучение , приверженность профессиональному сообществу.
                    </li>
                    <li>
                        ... это также мой собственный опыт проживания травматических переживаний, проблемных паттернов,
                        над которыми я работала и продолжаю работать.
                    </li>
                    <li>
                        ... это бесконечный путь духовного развития и становления собой.
                    </li>
                </ul>
                <br/>
                <h3>- Конфиденциальность по умолчанию -</h3>
            </section>

            {/* Секция "Моя направленность" */}
            <section className={`${styles.section} ${styles.vector}`}>
                <h2 className={styles.subtitle}>Моя направленность</h2>
                {/* Новый контейнер для обтекания */}
                <div className={styles.wrapper}>
                    <img
                        src="/images/photo.jpg"
                        alt="Фон"
                        className={styles.myPhoto}
                    />
                    <div className={styles.text}>
                        <p>
                            .. это поиск целостности и основ духовности, прежде всего.
                            Я нахожу очень важным в исследовании состояния человека и всего спектра его переживаний
                            учитывать все уровни сознания. И подходить не только на индивидуально-психологическом,
                            социальном уровне, но и психодуховном, развивать себя «на всех этажах».
                        </p>
                        <p>
                            На индивидуально-психологическом уровне это могут быть самые различные проблемы,
                            начиная от тревожных расстройств и панических атак, депрессивных состояний, проблем
                            с подавленной или неконтролируемой агрессией, зависимостей, расстройств пищевого
                            поведения, внутренней пустоты и др.
                        </p>
                        <p>
                            Социальные это могут быть различные проблемы отношений и самореализации.
                        </p>
                        <p>
                            Проблемы психодуховного аспекта, к сожалению, не рассматриваются на должном уровне.
                            Надличностные диапазоны обозначают широкий спектр глубинных переживаний, относимых к
                            духовному опыту.
                            В самой психологии эти вопросы относятся к наименее исследованным или ненаучным и поэтому, к
                            сожалению, не требующим рассмотрения. Существует целая обширная область, включающая
                            трансперсональный
                            опыт, внутренние прозрения, духовные кризисы, необычные состояния, трансцендентные
                            переживания,
                            которые могут влиять на психологическое состояние человека и выражаться иногда в кратких
                            психотических эпизодах или временном состоянии дезориентации.
                        </p>
                        <p>
                            Многие люди страдают от невозможности поделиться пугающим опытом и замыкаются.
                            Мой личный опыт заставил меня обратиться к поиску многочисленных вопросов,
                            встающих на этом пути, и мне глубоко интересно такое направление в психологии,
                            как трансперсональная, основателями которого вступали известные философы и психологи
                            того времени, такие как У Джеймс, К.Г. Юнг, Р. Ассаджиоли, А. Маслоу, К. Уилбер и другие,
                            и которая, к сожалению, до сих пор не имеет научного признания.
                        </p>
                        <p>
                            Я считаю очень важным находить холистический подход в исследовании состояния
                            человека и рассматривать внутренние процессы более целостно: на уровне физического,
                            эмоционального, ментального и тонкого энергетического тела. «Наше тело, энергетика, эмоции и
                            мысли — это рабочие инструменты, с помощью которых мы познаем мир и существуем на этой
                            земле».
                            Таким образом, наша внутренняя гармония зависит от гармонии четырех систем:
                            опорно-двигательная система (кости, суставы, мышцы); биохимическая система (пищеварение и метаболизм);
                            психическая система (эмоции и мысли); энергетическая система (как мы дышим, как мы наполняемся и расходуем
                            жизненную энергию). Такой холистический подход основан на том, что в человеке все различные аспекты:
                            физический, психический, эмоциональный и энергетический взаимосвязаны. С этой позиции рассматривается возникновение
                            психологических сложностей и подходы к гармонизации общего состояния. В своем подходе я делаю акцент на
                            развитии осознанности и считаю, что это единственный путь внутренней трансформации и обретения душевного покоя.
                        </p>
                    </div>
                    {/* Очистка float */}
                    <div style={{ clear: 'both' }}></div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;