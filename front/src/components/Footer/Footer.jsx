import React from "react";
import styles from "./Footer.module.css";

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.socials}>
                <a href="tel:+77019995898" className={styles.phone}>
                    (+996) 555 22 22 89
                </a>
                <a
                    href="https://api.whatsapp.com/send?phone=996555922289"
                    className={styles.link}
                >
                    <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://t.me/saltanat_tg" className={styles.link}>
                    <i className="fab fa-telegram-plane"></i>
                </a>
                <a
                    href="https://www.instagram.com/saltanat_tg"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                >
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            <p className={styles.text}>Создано Нургиз Мамытова, 2024</p>
        </div>
    </footer>
);

export default Footer;
