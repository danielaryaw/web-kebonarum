import { useEffect, useRef, useState } from "react";
import "./PendetaCarousel.css";
import pendeta1 from "../../assets/pdt/pendeta1.jpeg";
import pendeta2 from "../../assets/pdt/pendeta2.jpeg";

const PendetaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pendeta = [
    {
      id: 1,
      name: "Pdt. Nama Lengkap",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Convallis faucibus augue porttitor vestibulum. Aliquam ac eget venenatis integer. ",
      image: pendeta1,
    },
    {
      id: 2,
      name: "Pdt. Nama Lengkap",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Convallis faucibus augue porttitor vestibulum. Aliquam ac eget venenatis integer. ",
      image: pendeta2,
    },
    {
      id: 3,
      name: "Pdt. Nama Lengkap",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Convallis faucibus augue porttitor vestibulum. Aliquam ac eget venenatis integer. ",
      image: pendeta1,
    },
    {
      id: 4,
      name: "Pdt. Nama Lengkap",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur. Convallis faucibus augue porttitor vestibulum. Aliquam ac eget venenatis integer. ",
      image: pendeta2,
    },
  ];

  const itemsPerView = isMobile ? 1 : 2;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= pendeta.length - itemsPerView ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? pendeta.length - itemsPerView : prevIndex - 1,
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  return (
    <section className="pendeta-section">
      <div className="pendeta-container">
        <h2 className="pendeta-title">PENDETA GKJ KEBONARUM</h2>

        <div className="pendeta-carousel-wrapper">
          <button
            className="pendeta-carousel-button prev"
            onClick={prevSlide}
            aria-label="Previous"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="pendeta-carousel-track"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="pendeta-carousel-slides"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {pendeta.map((item) => (
                <div key={item.id} className="pendeta-carousel-item">
                  <div
                    className="pendeta-card"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="pendeta-info">
                      <h3 className="pendeta-name">{item.name}</h3>
                      <p className="pendeta-subtitle">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="pendeta-carousel-button next"
            onClick={nextSlide}
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PendetaCarousel;
