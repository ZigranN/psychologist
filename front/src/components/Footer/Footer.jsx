import styles from "./Footer.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {useEffect} from "react";

const Footer = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.topSection}>
                {/* Блок "О нас" */}
                <div className={styles.about}>
                    <p className={styles.aboutText}>
                        Я приглашаю вас в тонкое поле осознанности, в котором можно осваивать навыки самоосознавания и постигать искусство аутентичного чуткого контакта.
                    </p>
                </div>

                {/* Блок "Контакты" */}
                <div className={styles.socials}>
                    <h3 className={styles.heading}>Контакты</h3>
                    <a href="tel:+996555922289" className={styles.phone}>
                        (+996) 555 92 22 89
                    </a>
                    <div className={styles.socialLinks}>
                        <a
                            href="https://api.whatsapp.com/send?phone=996555922289"
                            className={styles.link}
                            aria-label="WhatsApp"
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a
                            href="https://t.me/saltanat_tg"
                            className={styles.link}
                            aria-label="Telegram"
                        >
                            <i className="fab fa-telegram-plane"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/saltanat_tg"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.link}
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Блок "Быстрые ссылки" */}
                <div className={styles.links}>
                    <h3 className={styles.heading}>Быстрые ссылки</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <NavLink to="/psychologist/about" className={styles.footerLink}>
                                Обо мне
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/psychologist/articles" className={styles.footerLink}>
                                Статьи
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/psychologist/booking" className={styles.footerLink}>
                                Записаться
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Нижний блок */}
            <div className={styles.bottomSection}>
                <p className={styles.creditText}>
                    Дизайн и разработка:
                    <a
                        href="https://github.com/NargizMam"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.creditLink}
                    >
                        Nargiz Mamytova
                    </a>
                </p>
                <p>© 2025</p>
            </div>
        </div>
    </footer>
)};

export default Footer;
