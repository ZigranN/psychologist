import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        sessionType: "",
        format: "",
        name: "",
        contact: "",
        therapyRequest: "",
    });
    const [statusMessage, setStatusMessage] = useState("");

    const sendMessageToTelegram = async (message) => {
        const BOT_TOKEN = '7720061220:AAELg2OiCYYaiRjciv3byBU9PlsbQhNreVw';
        const CHAT_ID = '1775514253';
        const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        try {
            const response = await fetch(TELEGRAM_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                }),
            });

            if (!response.ok) {
                new Error('Ошибка при отправке сообщения.');
            }

            console.log('Сообщение успешно отправлено!');
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (location.state) {
            setFormData((prevData) => ({
                ...prevData,
                sessionType: location.state.sessionType || "",
                format: location.state.format || "",
            }));
        }
    }, [location.state]);

    const validateForm = () => {
        const { sessionType, format, name, contact } = formData;

        if (!sessionType) {
            setStatusMessage("Пожалуйста, выберите формат записи.");
            return false;
        }

        if (!format) {
            setStatusMessage("Пожалуйста, выберите тип консультации.");
            return false;
        }

        if (!name.trim()) {
            setStatusMessage("Пожалуйста, введите ваше имя.");
            return false;
        }

        if (!contact.trim()) {
            setStatusMessage("Пожалуйста, введите ваш контактный телефон.");
            return false;
        }

        if (!/^[\d\s+()-]+$/.test(contact)) {
            setStatusMessage("Пожалуйста, введите корректный номер телефона.");
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const { sessionType, format, name, contact, therapyRequest } = formData;

        const message = `
📌 <b>Новая заявка:</b>
- 📝 <b>Формат записи:</b> ${sessionType || 'Не указано'}
- 🛋️ <b>Тип консультации:</b> ${format || 'Не указано'}
- 🙋 <b>Имя:</b> ${name}
- 📞 <b>Контакт:</b> ${contact}
- 📝 <b>Запрос:</b> ${therapyRequest || 'Не указано'}
        `;

        try {
            await sendMessageToTelegram(message);
            setStatusMessage("Заявка успешно отправлена!");
            setFormData({
                sessionType: '',
                format: '',
                name: '',
                contact: '',
                therapyRequest: '',
            });
        } catch  {
            setStatusMessage("Ошибка при отправке заявки. Попробуйте позже.");
        }
    };

    return (
        <div className={styles.bookingPage}>

            <div className={styles.card}>
                <h1 className={styles.title}>Запись на сессию</h1>
                {statusMessage && (
                    <div className={styles.statusMessage}>
                        <p>{statusMessage}</p>
                    </div>
                )}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Формат записи
                        <select
                            name="sessionType"
                            value={formData.sessionType}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="" disabled>Выберите формат записи</option>
                            <option value="online">Онлайн</option>
                            <option value="offline">Очно</option>
                        </select>
                    </label>

                    <label className={styles.label}>
                        Тип консультации
                        <select
                            name="format"
                            value={formData.format}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="" disabled>Выберите тип консультации</option>
                            <option value="individual">Индивидуальная</option>
                            <option value="couple">Парная</option>
                            <option value="group">Групповая</option>
                        </select>
                    </label>

                    <label className={styles.label}>
                        Ваше имя
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Введите ваше имя"
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label}>
                        Контактный телефон
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Введите ваш телефон"
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label}>
                        Запрос на терапию
                        <textarea
                            name="therapyRequest"
                            value={formData.therapyRequest}
                            onChange={handleChange}
                            placeholder="Опишите ваш запрос на терапию"
                            className={styles.textarea}
                        ></textarea>
                    </label>

                    <button type="submit" className={styles.button}>
                        Отправить запрос
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;
