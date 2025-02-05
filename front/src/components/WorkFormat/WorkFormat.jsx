import {useNavigate} from "react-router-dom";
import {useState} from "react";
import styles from "./WorkFormat.module.css";

const WorkFormat = () => {
        const [activeTab, setActiveTab] = useState("personal");
        const navigate = useNavigate();

        const handleTabClick = (tab) => {
            setActiveTab(tab);
        };

        const handleBooking = (sessionType, format) => {
            navigate("/psychologist/booking", { state: { sessionType, format } });
        };
        const [isModalOpen, setModalOpen] = useState(false);
        const [isModalOpen2, setModalOpen2] = useState(false);

        const handleModalToggle = () => {
            setModalOpen(!isModalOpen);
        };
        const handleModalToggle2 = () => {
            setModalOpen2(!isModalOpen2);
        };
        return (
            <section className={styles.workFormat}>
                <h2 className={styles.title}>ФОРМАТ МОЕЙ РАБОТЫ</h2>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "personal" ? styles.active : ""}`}
                        onClick={() => handleTabClick("personal")}
                    >
                        ЛИЧНЫЕ КОНСУЛЬТАЦИИ
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "group" ? styles.active : ""}`}
                        onClick={() => handleTabClick("group")}
                    >
                        ГРУППОВЫЕ КОНСУЛЬТАЦИИ
                    </button>
                </div>
                <div className={styles.content}>
                    {activeTab === "personal" && (
                        <div>
                            <div className={styles.theraphy}>
                                <p className={styles.therapyTrigger} onClick={handleModalToggle2}>
                                    Что дает личная терапия ?
                                </p>
                            </div>
                            <div className={styles.cardBlock}>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>Личная сессия</h3>
                                    <p>Очно / Онлайн</p>
                                    <div className={styles.icons}>
                                        <i className="fab fa-whatsapp"></i>
                                        <i className="fab fa-telegram-plane"></i>
                                        <i className="fas fa-video"></i>
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <div className={styles.details}>
                                        <span>Длительность: 60 мин</span>
                                        <span>Стоимость: 2500 сом</span>
                                        <strong>Стоимость курса / 7 сессий по 2300 сом</strong>
                                        <strong>Стоимость курса из 10 сессий: 20 000 сом</strong>

                                    </div>
                                    <button
                                        className={styles.cardButton}
                                        onClick={() => handleBooking("Личная консультация", "Онлайн")}
                                    >
                                        Записаться
                                    </button>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>Парная сессия</h3>
                                    <p>Очно / Онлайн</p>
                                    <p className={styles.cardDescription}>
                                        Фокус терапии пар в гешталь-подходе направлен прежде всего на то, как партнеры оргунизуют контакт между собой.
                                    </p>
                                    <div className={styles.icons}>
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className={styles.details}>
                                        <span>Длительность: 60 мин</span>
                                        <span>Стоимость: 3000 сом</span>
                                    </div>
                                    <button
                                        className={styles.cardButton}
                                        onClick={() => handleBooking("Личная консультация", "Офлайн")}
                                    >
                                        Записаться
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                    {activeTab === "group" && (
                        <div>
                            <div className={styles.theraphy}>
                                <p className={styles.therapyTrigger} onClick={handleModalToggle}>
                                    Что дает групповая терапия ?
                                </p>
                            </div>
                            <div className={styles.cardBlock}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Групповая онлайн-сессия</h3>
                                <p className={styles.cardDescription}>
                                    Возможность коллективной работы в формате онлайн-группы.
                                </p>
                                <div className={styles.icons}>
                                    <i className="fab fa-whatsapp"></i>
                                    <i className="fab fa-telegram-plane"></i>
                                    <i className="fas fa-video"></i>
                                </div>
                                <button
                                    className={styles.cardButton}
                                    onClick={() => handleBooking("Групповая консультация", "Онлайн")}
                                >
                                    Записаться
                                </button>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Групповая встреча</h3>
                                <p className={styles.cardDescription}>
                                    Возможность групповой работы в уютной обстановке в городе Бишкек.
                                </p>
                                <div className={styles.icons}>
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <button
                                    className={styles.cardButton}
                                    onClick={() => handleBooking("Групповая консультация", "Офлайн")}
                                >
                                    Записаться
                                </button>
                            </div>
                            </div>
                        </div>
                    )}
                    {isModalOpen && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <button className={styles.closeButton} onClick={handleModalToggle}>
                                    &times;
                                </button>
                                <h2>О групповой терапии</h2>
                                <p>
                                    В наши дни групповая терапия пользуется популярностью – растет количество самоактуализирующихся людей, выбирающих ее как способ  для развития осознанности.
                                    В групповом процессе заложены уникальные психотерапевтические возможности.
                                </p>
                                <p>
                                    В групповом процессе в особой атмосфере осознанности может стать возможным исследование своих стереотипных паттернов, конструирование гибких поведенческих моделей ,
                                    а также освоение на практике навыков осознанности и эмоциональной саморегуляции.
                                </p>
                                <p>Это может стать нужной практикой в жизни, которая  расширит границы познания себя и других и может создать мосты настоящей близости к себе и другим.
                                </p>
                            </div>
                        </div>
                    )}
                    {isModalOpen2 && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <button className={styles.closeButton} onClick={handleModalToggle2}>
                                    &times;
                                </button>
                                <p>Психотерапия может быть разной и это зависит не только от подхода, в котором работает психолог, но и от формата, семейная ,
                                    индивидуальная или групповая . В каждом формате есть свои условные плюсы и минусы.
                                    Нельзя сказать,что индивидуальная может заменить групповую.</p>
                                <h2>Об индивидуальной терапии</h2>
                                <p>
                                    Это формат,в котором психолог и клиент работают один на один,где ключевым инструментом становится беседа:
                                    сначала клиент и психолог формулируют запрос терапии, потом между ними постепенно выстраиваются отношения, основанные на эмпатии,
                                    безусловном принятии и стремлении к общей цели. Такая связь называется терапевтическим альянсом.
                                </p>
                                <p> Сроки всегда зависят от поставленных целей: иногда достаточно нескольких сессий,
                                    а иногда люди выбирают ходить на терапию долго. Это зависит от запроса.
                                    Некоторые клиенты приходят в терапию, чтобы преодолеть кризисную ситуацию или
                                    разобраться с одним конкретным запросом. Кто-то обращается со зрелым запросом, чтобы лучше узнать себя,
                                    получить отражение и приблизиться к себе. Это вопрос формирования более целостной идентичности,а также
                                    обрести навыки для раскрытия и  поддержания осознанности. Это требует времени. </p>
                                <p>Преимущества индивидуальной терапии</p>

                            <p>Клиент чувствует себя максимально безопасно ,может раскрывать более интимные вопросы,которые в групповой
                                терапии не уместно раскрывать. И  на исследование определённого запроса есть больше времени,час терапии и
                                это позволяет глубже проникать и ассимилировать опыт.
                                Все это с течением времени развивает навыки саморефлексии,
                                с которыми человек обретает большую ясность и устойчивость в различных сложных ситуациях.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    };

    export default WorkFormat;
