import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage.jsx";
import BookingPage from "./pages/BookingPage/BookingPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";


const App = () => (
    <>
        <Header />
        <Routes>
            <Route path="/psychologist/" element={<MainPage />} />
            <Route path="/psychologist/about" element={<AboutPage />} />
            <Route path="/psychologist/articles" element={<ArticlesPage />} />
            <Route path="/psychologist/booking" element={<BookingPage />} />
        </Routes>
        <Footer />
    </>

);

export default App;
