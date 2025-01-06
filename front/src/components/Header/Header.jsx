import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => (
    <header className={styles.header}>
        <div className={styles.container}>
            <h1 className={styles.title}>Салтанат Тагаева</h1>
            <nav className={styles.nav}>
                <NavLink to="/" className={styles.link} activeClassName={styles.active}>
                    Главная
                </NavLink>
                <NavLink
                    to="/about"
                    className={styles.link}
                    activeClassName={styles.active}
                >
                    Обо мне
                </NavLink>
                <NavLink
                    to="/articles"
                    className={styles.link}
                    activeClassName={styles.active}
                >
                    Статьи
                </NavLink>
                <NavLink
                    to="/booking"
                    className={styles.link}
                    activeClassName={styles.active}
                >
                    Запись
                </NavLink>
            </nav>
        </div>
    </header>
);

export default Header;
