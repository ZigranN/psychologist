import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from  './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const menu = document.querySelector(`.${styles.nav}`);
            const burger = document.querySelector(`.${styles.burger}`);
            // Если клик вне меню и кнопки-бургера, закрываем меню
            if (menu && burger && !menu.contains(event.target) && !burger.contains(event.target)) {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <NavLink to="/" className={styles.title}>Салтанат Тагаева</NavLink>
                    <p className={styles.preTitle}>Холистическая психология</p>
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
                    <NavLink to="/" className={styles.link} onClick={()=> setIsMenuOpen(false)}>
                        Главная
                    </NavLink>
                    <NavLink to="/about" className={styles.link} onClick={()=> setIsMenuOpen(false)}>
                        Обо мне
                    </NavLink>
                    <NavLink to="/articles" className={styles.link} onClick={()=> setIsMenuOpen(false)}>
                        Статьи
                    </NavLink>
                    <NavLink to="/booking" className={styles.link} onClick={()=> setIsMenuOpen(false)}>
                        Запись
                    </NavLink>
                    <div style={{ display: 'flex' }}>
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
