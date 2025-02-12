import { useState } from "react";
import styles from "./Appointment.module.css";

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);

    const [statusMessage, setStatusMessage] = useState(null);
    const [statusType, setStatusType] = useState(""); // "success" или "error"
    const handleModalToggle = () => {
        setModalOpen(!isModalOpen);
    };
    const sendMessageToTelegram = async (message) => {
        const BOT_TOKEN = '7720061220:AAELg2OiCYYaiRjciv3byBU9PlsbQhNreVw';
        const CHAT_ID = '1775514253';
        const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        try {
            console.log("🚀 Отправка сообщения в Telegram...");

            const response = await fetch(TELEGRAM_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });

            const responseData = await response.json();
            console.log("📩 Ответ Telegram API:", responseData);

            if (!response.ok || !responseData.ok) {
                throw new Error(`Ошибка Telegram API: ${responseData.description}`);
            }

            console.log("✅ Сообщение успешно отправлено!");
            return true;
        } catch (error) {
            console.error("❌ Ошибка при отправке:", error.message);
            return false;
        }
    };

    const validateForm = () => {
        const { name, contact } = formData;

        if (!name.trim()) {
            setStatusMessage("⚠️ Пожалуйста, введите ваше имя.");
            setStatusType("error");
            return false;
        }

        if (!contact.trim()) {
            setStatusMessage("⚠️ Пожалуйста, введите ваш контактный телефон.");
            setStatusType("error");
            return false;
        }

        if (!/^[\d\s+()-]+$/.test(contact)) {
            setStatusMessage("⚠️ Пожалуйста, введите корректный номер телефона.");
            setStatusType("error");
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setStatusMessage("");
        setStatusType("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const { name, contact } = formData;

        const message = `
📌 <b>Новая заявка на ознакомительную встречу:</b>
- 🙋 <b>Имя:</b> ${name}
- 📞 <b>Контакт:</b> ${contact}
- ⏳ <b>Длительность:</b> 30 минут
- 💰 <b>Стоимость:</b> 1500 сом
        `;

        setStatusMessage("⏳ Отправка заявки...");
        setStatusType("loading");

        const success = await sendMessageToTelegram(message);

        if (success) {
            setStatusMessage("✅ Заявка успешно отправлена!");
            setStatusType("success");
            setFormData({ name: "", contact: "" });
        } else {
            setStatusMessage("❌ Ошибка при отправке заявки. Попробуйте позже.");
            setStatusType("error");
        }
    };

    return (
        <section className={styles.appointment}>
            <div className={styles.container}>

                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <button className={styles.closeButton} onClick={handleModalToggle}>
                                &times;
                            </button>
                            <h2>Условия работы</h2>
                            <ul>
                                <li>Длительность сессии/ 60 минут</li>
                                <li>При опоздании со стороны клиента время сессии сокращается на время опоздания.</li>
                                <li>В случае опоздания с моей стороны, время продлевается, либо переносится на удобное
                                    для вас время.
                                </li>
                                <li>Время бронируется по предварительной оплате не позднее чем за сутки до проведения
                                    консультации.
                                </li>
                                <li>В случае, если вы отменили встречу менее чем за 24 часа - оплата не возвращается;
                                </li>
                                <li>В случае отмены встречи с моей стороны - возвращается сумма оплаты, либо я
                                    предоставляю скидку на консультацию по вашему усмотрению.
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                <div>

                </div>
                <div className={styles.image}>
                    <img src="/images/4.jpg" alt="Салтанат"/>
                </div>

                <div className={styles.form}>
                    <p className={styles.therapyTrigger} onClick={handleModalToggle}>
                        Условия работы
                    </p>
                    <h2 className={styles.title}>ЗАПИШИТЕСЬ НА ОЗНАКОМИТЕЛЬНУЮ ВСТРЕЧУ</h2>
                    <p>Где вы узнаете, соответствует ли вашему запросу мой подход</p>
                    <p className={styles.description}>
                        Длительность 30 минут, стоимость 1500 сом
                    </p>

                    {statusMessage && (
                        <div className={`${styles.statusMessage} ${styles[statusType]}`}>
                            <p>{statusMessage}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ваше имя"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="contact"
                            placeholder="(+996) 555 922289"
                            className={styles.input}
                            value={formData.contact}
                            onChange={handleChange}
                        />
                        <button type="submit" className={styles.button}>
                            Записаться
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
