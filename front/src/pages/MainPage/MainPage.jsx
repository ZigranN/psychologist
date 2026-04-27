import MainContent from "../../components/MainContent/MainContent";
import About from "../../components/About/About";
import Work from "../../components/Work/Work";
import WorkFormat from "../../components/WorkFormat/WorkFormat";
import Appointment from "../../components/Appointment/Appointment";
import SEO from "../../components/SEO";

const MainPage = () => (
    <>
        <SEO
            title="Гештальт-психолог в Бишкеке | Салтанат Тагаева | Онлайн консультации"
            description="Профессиональный гештальт-психолог Салтанат Тагаева в Бишкеке. Индивидуальная и групповая психотерапия. Онлайн консультации для жителей СНГ. Помощь в решении психологических проблем."
            url="https://psyholistic.kg/"
        />
        <MainContent />
        <About />
        <Work />
        <WorkFormat />
        <Appointment />
    </>
);

export default MainPage;
