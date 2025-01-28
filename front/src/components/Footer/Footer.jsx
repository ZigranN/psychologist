import styles from "./Footer.module.css";

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.about}>
                    <p className={styles.aboutText}>
                        Я приглашаю вас в тонкое поле осознанности, в котором можно обучиться осознаванию себя и искусству аутентичного чуткого контакта.                    </p>
                </div>
                <div className={styles.socials}>
                    <h3 className={styles.heading}>Контакты: </h3>
                    <a href="tel:+77019995898" className={styles.phone}>
                        (+996) 555 22 22 89
                    </a>
                    <div className={styles.socialLinks}>
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
                </div>
                <div className={styles.links}>
                    <h3 className={styles.heading}>Быстрые ссылки</h3>
                    <ul className={styles.linkList}>
                        <li>
                            <a href="/psychologist/about" className={styles.footerLink}>
                                Обо мне
                            </a>
                        </li>
                        <li>
                            <a href="/psychologist/articles" className={styles.footerLink}>
                                Статьи
                            </a>
                        </li>
                        <li>
                            <a href="/psychologist/booking" className={styles.footerLink}>
                                Записаться
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <p className={styles.creditLink}>Дизайн и разработка: <a href="https://github.com/NargizMam" target="_blank" rel="noreferrer" className={styles.creditLink}>Nargiz Mamytova © 2025</a></p>
            </div>
        </div>
    </footer>
);

export default Footer;
