import { useEffect, useState } from "react";
import "./YoutubePage.css";
import Navbar from "../../components/menu/Navbar";
import Footer from "../../components/menu/Footer";
import { getYoutubeVideos } from "../../services/youtubeApi";

const YOUTUBE_CACHE_KEY = "youtube-page-content-cache-v2";
const YOUTUBE_CACHE_TTL_MS = 5 * 60 * 1000;

const readYoutubeCache = () => {
  try {
    const rawCache = localStorage.getItem(YOUTUBE_CACHE_KEY);

    if (!rawCache) {
      return null;
    }

    const parsedCache = JSON.parse(rawCache);
    const isExpired = Date.now() - parsedCache.timestamp > YOUTUBE_CACHE_TTL_MS;

    if (isExpired) {
      localStorage.removeItem(YOUTUBE_CACHE_KEY);
      return null;
    }

    const items = Array.isArray(parsedCache.items) ? parsedCache.items : [];
    const livestreamItems = Array.isArray(parsedCache.livestreamItems)
      ? parsedCache.livestreamItems
      : [];
    const liveNowItems = Array.isArray(parsedCache.liveNowItems)
      ? parsedCache.liveNowItems
      : [];

    return {
      items,
      livestreamItems,
      liveNowItems,
    };
  } catch (error) {
    localStorage.removeItem(YOUTUBE_CACHE_KEY);
    return null;
  }
};

const writeYoutubeCache = ({ items, livestreamItems, liveNowItems }) => {
  try {
    const payload = {
      timestamp: Date.now(),
      items,
      livestreamItems,
      liveNowItems,
    };

    localStorage.setItem(YOUTUBE_CACHE_KEY, JSON.stringify(payload));
  } catch (error) {}
};

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const VideoCard = ({ item }) => (
  <article className="youtube-video-card">
    <div className="youtube-video-frame-wrapper">
      <iframe
        className="youtube-video-frame"
        src={`https://www.youtube.com/embed/${item.id}`}
        title={item.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
    <div className="youtube-video-meta">
      <h3 className="youtube-video-title">{item.title}</h3>
      <p className="youtube-video-date">{formatDate(item.uploadedAt)}</p>
    </div>
  </article>
);

const SkeletonCard = () => (
  <article
    className="youtube-video-card youtube-video-card-skeleton"
    aria-hidden
  >
    <div className="youtube-video-frame-wrapper youtube-skeleton-block"></div>
    <div className="youtube-video-meta">
      <div className="youtube-skeleton-line youtube-skeleton-title"></div>
      <div className="youtube-skeleton-line youtube-skeleton-title"></div>
      <div className="youtube-skeleton-line youtube-skeleton-date"></div>
    </div>
  </article>
);

const LiveNowEmptyCard = () => (
  <article className="youtube-live-empty-card" role="status" aria-live="polite">
    <h3 className="youtube-live-empty-title">Belum Ada Live Sekarang</h3>
    <p className="youtube-live-empty-text">
      Jadwal livestream berikutnya belum tersedia. Silakan cek lagi nanti.
    </p>
  </article>
);

const YoutubePage = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [livestreamVideos, setLivestreamVideos] = useState([]);
  const [liveNowVideos, setLiveNowVideos] = useState([]);
  const [isLoadingYoutubeVideos, setIsLoadingYoutubeVideos] = useState(false);
  const [youtubeError, setYoutubeError] = useState("");

  useEffect(() => {
    const cachedContent = readYoutubeCache();

    if (cachedContent) {
      setYoutubeVideos(cachedContent.items);
      setLivestreamVideos(cachedContent.livestreamItems);
      setLiveNowVideos(cachedContent.liveNowItems);
      setIsLoadingYoutubeVideos(false);
    }

    const loadYoutubeVideos = async () => {
      setIsLoadingYoutubeVideos(!cachedContent);
      setYoutubeError("");

      try {
        const { items, livestreamItems, liveNowItems } = await getYoutubeVideos(
          {
            pageSize: 50,
            livestreamPageSize: 12,
          },
        );
        setYoutubeVideos(items);
        setLivestreamVideos(livestreamItems);
        setLiveNowVideos(liveNowItems);
        writeYoutubeCache({ items, livestreamItems, liveNowItems });
      } catch (error) {
        if (!cachedContent) {
          setYoutubeVideos([]);
          setLivestreamVideos([]);
          setLiveNowVideos([]);
          setYoutubeError("Konten YouTube belum dapat dimuat saat ini.");
        }
      } finally {
        setIsLoadingYoutubeVideos(false);
      }
    };

    loadYoutubeVideos();
  }, []);

  const upcomingLivestream = liveNowVideos[0];
  const pastLivestreams = livestreamVideos.slice(0, 3);
  const ourContent = youtubeVideos.slice(0, 6);

  return (
    <>
      <Navbar />
      <main className="youtube-page">
        <section className="youtube-hero">
          <div className="youtube-hero-content">
            <p className="youtube-kicker">GKJ Kebonarum Klaten</p>
            <h1 className="youtube-title">
              YouTube
              <br />
              GKJ Kebonarum
            </h1>
            <p className="youtube-lead">
              Saksikan berbagai video ibadah, acara, dan kegiatan GKJ Kebonarum
              di saluran YouTube resmi kami. Jangan lupa untuk subscribe agar
              tidak ketinggalan update terbaru dari pelayanan dan kegiatan kami.
            </p>
            <a
              className="youtube-account-link"
              href={"https://www.youtube.com/@gkjkebonarummultimedia3831"}
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          </div>
        </section>

        <section className="youtube-section">
          <div className="youtube-section-inner">
            <h2 className="youtube-section-title">Live Now</h2>
            <div className="youtube-grid youtube-grid-single">
              {isLoadingYoutubeVideos ? (
                <SkeletonCard />
              ) : upcomingLivestream ? (
                <VideoCard item={upcomingLivestream} />
              ) : youtubeError ? (
                <p className="youtube-error-text">{youtubeError}</p>
              ) : (
                <LiveNowEmptyCard />
              )}
            </div>
          </div>
        </section>

        <section className="youtube-section youtube-section-alt">
          <div className="youtube-section-inner">
            <h2 className="youtube-section-title">Past Livestreaming</h2>
            <div className="youtube-grid youtube-grid-three">
              {isLoadingYoutubeVideos ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={`past-livestream-skeleton-${index}`} />
                ))
              ) : pastLivestreams.length > 0 ? (
                pastLivestreams.map((item) => (
                  <VideoCard key={item.id} item={item} />
                ))
              ) : (
                <p className="youtube-error-text">Belum ada data livestream.</p>
              )}
            </div>
          </div>
        </section>

        <section className="youtube-section">
          <div className="youtube-section-inner">
            <h2 className="youtube-section-title">Our Content</h2>
            <div className="youtube-grid youtube-grid-six">
              {isLoadingYoutubeVideos ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={`our-content-skeleton-${index}`} />
                ))
              ) : ourContent.length > 0 ? (
                ourContent.map((item) => (
                  <VideoCard key={item.id} item={item} />
                ))
              ) : (
                <p className="youtube-error-text">Belum ada video terbaru.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default YoutubePage;
