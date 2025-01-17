import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h1 className={styles.title}>Салтанат Тагаева</h1>
                </div>
                <button
                    className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className={styles.burgerLine}></span>
                    <span className={styles.burgerLine}></span>
                    <span className={styles.burgerLine}></span>
                </button>
                <div className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
                    <NavLink to="/" className={styles.link}>
                        Главная
                    </NavLink>
                    <NavLink to="/about" className={styles.link}>
                        Обо мне
                    </NavLink>
                    <NavLink to="/articles" className={styles.link}>
                        Статьи
                    </NavLink>
                    <NavLink to="/booking" className={styles.link}>
                        Запись
                    </NavLink>
                    <div style={{display: 'flex'}}>
                        <a
                            href="https://api.whatsapp.com/send?phone=996555922289"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.icon}
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a
                            href="https://t.me/saltanat_tg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.icon}
                        >
                            <i className="fab fa-telegram-plane"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/saltanat_tg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.icon}
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
