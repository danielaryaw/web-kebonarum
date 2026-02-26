import "./InstagramPage.css";
import Navbar from "../../components/menu/Navbar";
import Footer from "../../components/menu/Footer";
import { useEffect } from "react";

const INSTAGRAM_ACCOUNT_URL = "https://www.instagram.com/gkj_kebonarum/";

const InstagramPage = () => {
  useEffect(() => {
    // Load Instagram embed script
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="instagram-page">
        <section className="instagram-hero">
          <div className="instagram-hero-content">
            <p className="instagram-kicker">GKJ Kebonarum Klaten</p>
            <h1 className="instagram-title">
              Instagram
              <br />
              GKJ Kebonarum
            </h1>
            <p className="instagram-lead">
              Ikuti update terbaru pelayanan, kegiatan jemaat, dan momen
              kebersamaan melalui feed Instagram GKJ Kebonarum.
            </p>
            <a
              className="instagram-account-link"
              href={INSTAGRAM_ACCOUNT_URL}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </section>

        <section className="instagram-section">
          <div className="instagram-section-inner">
            <div
              className="instagram-blockquote-container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/gkj_kebonarum/"
                data-instgrm-version="12"
                style={{ width: "800px", border: "none", overflow: "hidden" }}
              ></blockquote>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default InstagramPage;
