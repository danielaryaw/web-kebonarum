import "./LandingPage.css";
import Navbar from "../components/menu/Navbar";
import EventCarousel from "../components/landing_page/EventCarousel";
import PendetaCarousel from "../components/landing_page/PendetaCarousel";
import Separator from "../components/landing_page/Separator";
import KebonarumInfo from "../components/landing_page/KebonarumInfo";
import VisiMisi from "../components/landing_page/VisiMisi";
import Footer from "../components/menu/Footer";
import backgroundVideo from "../assets/videos/background-video.mp4";
import sugenRawuhBig from "../assets/sugeng-rawuh-big.svg";
import sugenRawuhSmall from "../assets/sugeng-rawuh-small.svg";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="landing-page">
        <video className="video-background" autoPlay muted loop playsInline>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay"></div>

        <div className="landing-content">
          <picture className="welcome-title">
            <source media="(max-width: 768px)" srcSet={sugenRawuhSmall} />
            <img
              src={sugenRawuhBig}
              alt="Sugeng Rawuh"
              className="welcome-image"
            />
          </picture>
        </div>
      </div>
      <Separator />
      <EventCarousel />
      <KebonarumInfo />
      <VisiMisi />
      <PendetaCarousel />
      <Footer />
    </>
  );
};

export default LandingPage;
