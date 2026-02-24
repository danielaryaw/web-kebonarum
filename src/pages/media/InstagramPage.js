import { useEffect, useState } from "react";
import "./InstagramPage.css";
import Navbar from "../../components/menu/Navbar";
import Footer from "../../components/menu/Footer";
import {
  INSTAGRAM_ACCESS_TOKEN,
  INSTAGRAM_ACCOUNT_URL,
  INSTAGRAM_FEED_ITEMS,
  INSTAGRAM_FEED_LIMIT,
  INSTAGRAM_GRAPH_API_URL,
} from "../../config/instagramFeeds";

const InstagramPage = () => {
  const [instagramFeedItems, setInstagramFeedItems] =
    useState(INSTAGRAM_FEED_ITEMS);

  useEffect(() => {
    const fetchInstagramFeeds = async () => {
      if (!INSTAGRAM_ACCESS_TOKEN) {
        return;
      }

      try {
        const query = new URLSearchParams({
          fields: "id,caption,media_type,permalink,timestamp",
          limit: String(INSTAGRAM_FEED_LIMIT),
          access_token: INSTAGRAM_ACCESS_TOKEN,
        });

        const response = await fetch(`${INSTAGRAM_GRAPH_API_URL}?${query}`);
        const result = await response.json();
        const mediaItems = Array.isArray(result?.data) ? result.data : [];

        const mappedFeedItems = mediaItems
          .filter((item) => item?.permalink)
          .map((item) => ({
            id: item.id,
            permalink: item.permalink,
          }));

        if (mappedFeedItems.length > 0) {
          setInstagramFeedItems(mappedFeedItems);
        }
      } catch (error) {
        setInstagramFeedItems(INSTAGRAM_FEED_ITEMS);
      }
    };

    fetchInstagramFeeds();
  }, []);

  useEffect(() => {
    const loadInstagramEmbed = () => {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        if (window.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    };

    if (!window.instgrm) {
      loadInstagramEmbed();
      return;
    }

    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  }, [instagramFeedItems]);

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
            <h2 className="instagram-section-title">Feed Instagram</h2>
            <div className="instagram-grid">
              {instagramFeedItems.map((item) => (
                <article key={item.id} className="instagram-card">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={`${item.permalink}?utm_source=ig_embed&utm_campaign=loading`}
                    data-instgrm-version="14"
                  >
                    <a href={item.permalink} target="_blank" rel="noreferrer">
                      Lihat post Instagram
                    </a>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default InstagramPage;
