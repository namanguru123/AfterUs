import Header from "../components/layout/Header";
import Hero from "../components/sections/Landing/Hero";
import Problem from "../components/sections/Landing/Problem";
import AboutAfterUs from "../components/sections/Landing/AboutAfterUS";
import HowItWorks from "../components/sections/Landing/HowItWorks";
import PrivacySecurity from "../components/sections/Landing/PrivacySecurity";
import WhoItsFor from "../components/sections/Landing/WhoItsFor";
import CareSection from "../components/sections/Landing/CareSection";
import FinalCTA from "../components/sections/Landing/FinalCTA";
import Footer from "../components/layout/Footer";

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col" >
            <Header />
            <Hero />
            <Problem />
            <AboutAfterUs />
            <HowItWorks />
            <PrivacySecurity />
            <WhoItsFor />
            <CareSection />
            <FinalCTA />
            <Footer />
        </div>
    )

}