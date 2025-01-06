import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage.jsx";
import BookingPage from "./pages/BookingPage/BookingPage.jsx";
import Footer from "./components/Footer/Footer.jsx";


function AboutPage() {
    return null;
}

const App = () => (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/booking" element={<BookingPage />} />
        </Routes>
        <Footer />
    </>

);

export default App;
