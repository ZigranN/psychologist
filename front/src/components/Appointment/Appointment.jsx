import { useState } from "react";
import styles from "./Appointment.module.css";

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
    });
    const [statusMessage, setStatusMessage] = useState(null);
    const [statusType, setStatusType] = useState(""); // "success" или "error"

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
                <div className={styles.image}>
                    <img src="/psychologist/images/4.jpg" alt="Салтанат" />
                </div>
                <div className={styles.form}>
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
