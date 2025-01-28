import styles from "./Appointment.module.css";

const Appointment = () => (
    <section className={styles.appointment}>
        <div className={styles.container}>
            <div className={styles.image}>
                <img src="./images/4.jpg" alt="Салтанат" />
            </div>
            <div className={styles.form}>
                <h2 className={styles.title}>ЗАПИШИТЕСЬ НА ПЕРВЫЙ СЕАНС</h2>
                <p className={styles.description}>
                    На первом сеансе мы разберем вашу ситуацию, и вы поймете, подойдет ли
                    вам мой подход
                </p>
                <form>
                    <input type="text" placeholder="Ваше имя" className={styles.input} />
                    <input
                        type="tel"
                        placeholder="(+996) 555 922289"
                        className={styles.input}
                    />
                    <button type="button" className={styles.button}>
                        Записаться
                    </button>
                </form>
            </div>
        </div>
    </section>
);

export default Appointment;
