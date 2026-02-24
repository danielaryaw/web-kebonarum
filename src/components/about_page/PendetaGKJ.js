import "./PendetaGKJ.css";
import pendeta1 from "../../assets/pdt/pendeta1.jpeg";
import pendeta2 from "../../assets/pdt/pendeta2.jpeg";

const PendetaGKJ = () => {
  const pendetaData = [
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

  return (
    <section className="pendeta-gkj-kebonarum">
      <div className="pendeta-gkj-container">
        <div className="pendeta-gkj-header">
          <h2 className="pendeta-gkj-title">PENDETA GKJ KEBONARUM</h2>
          <p className="pendeta-gkj-description">
            Pendeta GKJ Kebonarum adalah pemimpin rohani yang bertanggung jawab
            untuk membimbing jemaat dalam kehidupan iman, pelayanan, dan
            pertumbuhan rohani. Mereka memainkan peran penting dalam memimpin
            ibadah, memberikan pengajaran Alkitab, dan memberikan dukungan
            pastoral kepada anggota jemaat.
          </p>
        </div>

        <div className="pendeta-gkj-grid">
          {pendetaData.map((item) => (
            <div key={item.id} className="pendeta-gkj-card">
              <div
                className="pendeta-gkj-image"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="pendeta-gkj-info">
                  <h3 className="pendeta-gkj-name">{item.name}</h3>
                  <p className="pendeta-gkj-subtitle">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PendetaGKJ;
