import { useState } from "react";
import "./DocumentationPage.css";
import Navbar from "../../components/menu/Navbar";
import Footer from "../../components/menu/Footer";
import { DOCUMENTATION_ITEMS } from "../../config/documentationConfig";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const DocumentationCard = ({ item }) => (
  <article className="documentation-card">
    <div className="documentation-card-image">
      <img src={item.imageUrl} alt={item.title} />
      <span className="documentation-card-category">{item.category}</span>
    </div>
    <div className="documentation-card-content">
      <h3 className="documentation-card-title">{item.title}</h3>
      <p className="documentation-card-date">{formatDate(item.date)}</p>
    </div>
  </article>
);

const DocumentationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    ...new Set(DOCUMENTATION_ITEMS.map((item) => item.category)),
  ];

  const filteredItems = selectedCategory
    ? DOCUMENTATION_ITEMS.filter((item) => item.category === selectedCategory)
    : DOCUMENTATION_ITEMS;

  return (
    <>
      <Navbar />
      <main className="documentation-page">
        <section className="documentation-hero">
          <div className="documentation-hero-content">
            <p className="documentation-kicker">GKJ Kebonarum Klaten</p>
            <h1 className="documentation-title">Dokumentasi<br/>GKJ Kebonarum</h1>
            <p className="documentation-lead">
              Jelajahi dokumentasi lengkap tentang GKJ Kebonarum, mulai dari
              sejarah, visi misi, struktur organisasi, hingga informasi pendeta
              dan tim pelayanan yang melayani dengan dedicated.
            </p>
          </div>
        </section>

        <section className="documentation-filters">
          <div className="documentation-filters-inner">
            <button
              className={`documentation-filter-btn ${
                selectedCategory === null ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`documentation-filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="documentation-section">
          <div className="documentation-section-inner">
            <div className="documentation-grid">
              {filteredItems.map((item) => (
                <DocumentationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DocumentationPage;
