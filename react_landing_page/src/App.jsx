// src/App.jsx
import './App.css';
import Main_section from "./Main_section.jsx";
import Services_section from './Services_section.jsx';
import Choose_us_section from './Choose_us_section.jsx';
import Footer from "./Footer.jsx";
import Ending_footer from './Ending_footer.jsx';
import AboutUsSection from './AboutUsSection.jsx';

function App() {
    return (
        <>
            <Main_section />
            <Services_section />
            <Choose_us_section />
            <AboutUsSection />
            <Footer />
            <Ending_footer />
        </>
    );
}

export default App;

