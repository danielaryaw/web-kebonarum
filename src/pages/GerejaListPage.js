import "./GerejaListPage.css";
import Navbar from "../components/menu/Navbar";
import Footer from "../components/menu/Footer";
import { INSTAGRAM_ACCOUNT_URL } from "../config/instagramFeeds";
import sejarah1 from "../assets/sejarah/1.jpg";
import sejarah2 from "../assets/sejarah/2.jpg";
import sejarah3 from "../assets/sejarah/3.jpg";
import sejarah4 from "../assets/sejarah/4.jpg";
import sejarah5 from "../assets/sejarah/5.jpg";

const GerejaListPage = () => {
  const defaultContact = {
    phone: "+62 812 345 678",
    phoneLink: "tel:+62812345678",
    email: "gkjkebonarum@gmail.com",
    instagram: "@gkj_kebonarum",
  };

  const gerejaList = [
    {
      id: 1,
      name: "SUMBEREJO",
      address:
        "Jl Pengkol, Bendogantungan II No.001/007, Bendogantungan, Sumberejo, Klaten Selatan, Klaten Regency, Central Java 57426",
      schedule: [
        "06.00 WIB - Bahasa Indonesia",
        "08.00 WIB - Bahasa Jawa",
        "17.00 WIB - Bahasa Indonesia",
      ],
      ibadahLabel: "Jadwal Ibadah",
      contact: defaultContact,
      image: sejarah1,
    },
    {
      id: 2,
      name: "KROSOK",
      address:
        "Jl Pengkol, Bendogantungan II No.001/007, Bendogantungan, Sumberejo, Klaten Selatan, Klaten Regency, Central Java 57426",
      schedule: ["07.00 WIB"],
      ibadahLabel: "Jadwal Ibadah",
      contact: defaultContact,
      image: sejarah2,
    },
    {
      id: 3,
      name: "PLUNENG",
      address:
        "Jl Pengkol, Bendogantungan II No.001/007, Bendogantungan, Sumberejo, Klaten Selatan, Klaten Regency, Central Java 57426",
      schedule: ["07.00 WIB"],
      ibadahLabel: "Jadwal Ibadah",
      contact: defaultContact,
      image: sejarah3,
    },
    {
      id: 4,
      name: "NGRUNDUL",
      address:
        "Jl Pengkol, Bendogantungan II No.001/007, Bendogantungan, Sumberejo, Klaten Selatan, Klaten Regency, Central Java 57426",
      schedule: ["07.00 WIB"],
      ibadahLabel: "Jadwal Ibadah",
      contact: defaultContact,
      image: sejarah4,
    },
    {
      id: 5,
      name: "PRAYAN",
      address:
        "Jl Pengkol, Bendogantungan II No.001/007, Bendogantungan, Sumberejo, Klaten Selatan, Klaten Regency, Central Java 57426",
      schedule: ["07.00 WIB"],
      ibadahLabel: "Jadwal Ibadah",
      contact: defaultContact,
      image: sejarah5,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="gereja-list-page">
        <section className="gereja-list-hero">
          <div className="gereja-list-hero-content">
            <p className="gereja-list-kicker">GKJ Kebonarum Klaten</p>
            <h1 className="gereja-list-title">
              Daftar Gereja
              <br />
              GKJ Kebonarum
            </h1>
            <p className="gereja-list-lead">
              GKJ Kebonarum memiliki beberapa gereja yang tersebar di wilayah
              Klaten, melayani jemaat dengan kasih dan pengajaran firman yang
              setia.
            </p>
          </div>
        </section>

        <section className="gereja-list-section">
          <div className="gereja-list-inner">
            <div className="gereja-list-grid">
              {gerejaList.map((gereja, index) => (
                <article
                  key={gereja.id}
                  className={`gereja-item${index % 2 === 1 ? " gereja-item--reverse" : ""}`}
                >
                  <div className="gereja-item-image">
                    <img src={gereja.image} alt={gereja.name} />
                  </div>
                  <div className="gereja-item-content">
                    <h2 className="gereja-item-title">{gereja.name}</h2>
                    <div className="gereja-item-details">
                      <p className="gereja-item-address">{gereja.address}</p>
                      <div className="gereja-item-schedule">
                        <h4 className="schedule-label">{gereja.ibadahLabel}</h4>
                        <ul className="schedule-list">
                          {gereja.schedule.map((jadwal, idx) => (
                            <li key={idx}>{jadwal}</li>
                          ))}
                        </ul>

                        <div className="gereja-item-contact">
                          <h4 className="schedule-label">Kontak</h4>
                          <ul className="contact-list">
                            <li>
                              Telp:{" "}
                              <a href={gereja.contact.phoneLink}>
                                {gereja.contact.phone}
                              </a>
                            </li>
                            <li>
                              Email:{" "}
                              <a href={`mailto:${gereja.contact.email}`}>
                                {gereja.contact.email}
                              </a>
                            </li>
                            <li>
                              Instagram:{" "}
                              <a
                                href={INSTAGRAM_ACCOUNT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {gereja.contact.instagram}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default GerejaListPage;
