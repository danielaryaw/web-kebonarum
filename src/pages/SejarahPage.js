import "./SejarahPage.css";
import Navbar from "../components/menu/Navbar";
import Footer from "../components/menu/Footer";
import event1 from "../assets/sejarah/1.jpg";
import event2 from "../assets/sejarah/2.jpg";
import event3 from "../assets/sejarah/3.jpg";
import event4 from "../assets/sejarah/4.jpg";
import event5 from "../assets/sejarah/5.jpg";

const SejarahPage = () => {
  const timelineItems = [
    {
      year: "1930",
      title: "Awal Pelayanan",
      description:
        "Pelayanan GKJ Kebonarum dimulai dari persekutuan sederhana yang tumbuh bersama keluarga-keluarga di sekitar Kebonarum.",
      image: event1,
    },
    {
      year: "1955",
      title: "Perintisan Jemaat",
      description:
        "Jemaat bertumbuh dan membangun struktur pelayanan yang lebih rapi untuk pembinaan iman dan pelayanan sosial.",
      image: event2,
    },
    {
      year: "1978",
      title: "Pembangunan Gedung Gereja",
      description:
        "Gedung gereja pertama dibangun sebagai pusat ibadah, pembinaan, dan penggembalaan jemaat.",
      image: event3,
    },
    {
      year: "2005",
      title: "Penguatan Pelayanan",
      description:
        "Pelayanan kategorial diperkuat, termasuk pembinaan anak, remaja, pemuda, dan pelayanan keluarga.",
      image: event4,
      secondaryImage: event2,
    },
    {
      year: "2020",
      title: "Pelayanan Digital",
      description:
        "GKJ Kebonarum mulai mengembangkan pelayanan digital agar penggembalaan tetap berjalan di era baru.",
      image: event5,
      secondaryImage: event3,
    },
  ];

  const doubleRowIndexes = new Set([3, timelineItems.length - 1]);

  return (
    <>
      <Navbar />
      <main className="sejarah-page">
        <section className="sejarah-hero">
          <div className="sejarah-hero-content">
            <p className="sejarah-kicker">GKJ Kebonarum Klaten</p>
            <h1 className="sejarah-title">
              Sejarah
              <br />
              GKJ Kebonarum
            </h1>
            <p className="sejarah-lead">
              Perjalanan iman GKJ Kebonarum dibangun melalui kesetiaan jemaat
              dalam pelayanan, persekutuan, dan kesaksian di tengah masyarakat.
            </p>
          </div>
        </section>

        <section className="sejarah-section">
          <div className="sejarah-section-inner">
            <h2 className="sejarah-section-title">Lintasan Waktu</h2>
            <div className="sejarah-timeline">
              {timelineItems.map((item, index) =>
                (() => {
                  const isDouble =
                    doubleRowIndexes.has(index) && Boolean(item.secondaryImage);
                  const isReverse = !isDouble && index % 2 === 1;

                  return (
                    <div
                      key={item.year}
                      className={`timeline-item${isReverse ? " timeline-item--reverse" : ""}${isDouble ? " timeline-item--double" : ""}`}
                    >
                      <div className="timeline-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="timeline-content">
                        <div
                          className={`timeline-year timeline-year--in-content${isReverse ? " timeline-year--in-content-reverse" : ""}`}
                        >
                          {item.year}
                        </div>
                        <h3 className="timeline-title">{item.title}</h3>
                        <p className="timeline-description">
                          {item.description}
                        </p>
                      </div>
                      {item.secondaryImage && (
                        <div className="timeline-image timeline-image--secondary">
                          <img
                            src={item.secondaryImage}
                            alt={`${item.title} tambahan`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })(),
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SejarahPage;
