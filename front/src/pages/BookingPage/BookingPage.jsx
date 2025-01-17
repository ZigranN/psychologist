import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        sessionType: "",
        format: "",
        name: "",
        contact: "",
    });

    useEffect(() => {
        if (location.state) {
            setFormData((prevData) => ({
                ...prevData,
                sessionType: location.state.sessionType || "",
                format: location.state.format || "",
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Данные отправлены:", formData);
        alert("Ваш запрос отправлен!");
    };

    return (
        <div className={styles.bookingPage}>
            <h1 className={styles.title}>Запись на сессию</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Формат записи
                    <input
                        type="text"
                        name="sessionType"
                        value={formData.sessionType}
                        onChange={handleChange}
                        placeholder="Введите формат записи"
                        className={styles.input}
                        readOnly
                    />
                </label>

                <label className={styles.label}>
                    Тип консультации
                    <input
                        type="text"
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        placeholder="Введите тип консультации"
                        className={styles.input}
                        readOnly
                    />
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

                <button type="submit" className={styles.button}>
                    Отправить запрос
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
