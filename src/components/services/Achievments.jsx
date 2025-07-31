import { faLink, faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const awards = [
  {
    id: "BASEF",
    title: "BASEF 2024 & 2025",
    modalTitle: "BASEF 2024",
    image: "https://img.peapix.com/2622272799050844425_UHD.jpg?attachment&modal",
    description: `BASEF 2024 - Bronze Medal Winners / BASEF 2025 Finalists at the republican science and engineering fair - Software systems branch.`,
    link: "https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR",
    linkText: "Abstracts/Presentations"
  },
  {
    id: "IEEE",
    title: "IEEE YESIST12 Junior Einstein",
    modalTitle: "IEEE YESIST12 Junior Einstein",
    image: "https://i.ytimg.com/vi/wHz12mg5MQ4/maxresdefault.jpg",
    description: `IEEE YESIST12 Junior Einstein 2024 - 1st Place Winners (National Level), Global Finalists 2x.`,
    link: "https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR",
    linkText: "Abstracts/Presentations"
  },
  {
    id: "NCCSI",
    title: "NCCSI",
    modalTitle: "NCCSI 2024",
    image: "https://media.licdn.com/dms/image/D4D22AQGYf8O7059Jiw/feedshare-shrink_800/0/1717161113360?e=2147483647&v=beta&t=hH-NNzss8KJjowZys8ylGlT3L3Q0_B_MPyHLgZQrYYE",
    description: `We are among the projects nominated to participate in the National Competition for Creative Sustainable Ideas (NCCSI) during the 2024 ITC Egypt Conference.`,
    link: "https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR",
    linkText: "Abstracts/Presentations"
  },
  {
    id: "SRTA",
    title: "City of Scientific Research and Technological Applications",
    modalTitle: "SRTA - Approval Of Scientific Research",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/SRTA-City.jpg",
    description: `Our project has been officially approved by the SRTA committee and granted scientific research credits.`,
    link: "https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR",
    linkText: "Approval of scientific research"
  },
  {
    id: "SUTech",
    title: "Mini Shark Tank Egypt",
    modalTitle: "SUTech - Mini Shark Tank Egypt",
    image: "https://powernews.cc/wp-content/uploads/2025/05/IMG-20250515-WA0043-scaled.jpg",
    description: `Mini Shark Tank Egypt - Top 7 Finalists (SUTech-Sponsored).`,
    link: "https://www.facebook.com/sutegypt/posts/attention-all-aspiring-innovators-the-techtank-competition-is-officially-launchi/592226037200390/",
    linkText: "Invitations!"
  }
];

function Achievments() {
  return (
    <section className="py-5 bg-light" id="achievements">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="mb-3 fw-bold text-dark">🏆 Our Achievements</h1>
          <p className="fw-medium fs-5 text-muted">
            A collection of national & international awards and recognitions.
          </p>
          <a
            className="btn btn-primary shadow-sm mt-3"
            href="https://drive.google.com/drive/folders/1kRrhAZokFGh8P3DNR8rIo-a6WUwVcd17"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faAward} className="me-2" />
            View All Certificates
          </a>
        </header>

        <div className="row g-4">
          {awards.map(({ id, title, modalTitle, image, description, link, linkText }) => (
            <div className="col-12 col-sm-6 col-lg-4" key={id}>
              <div className="card border-0 shadow-lg h-100">
                <div className="position-relative">
                  <img
                    src={image}
                    alt={title}
                    className="card-img-top rounded-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <span className="badge bg-primary position-absolute top-0 start-0 m-2">
                    {id}
                  </span>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-dark fw-bold">{title}</h5>
                  <button
                    type="button"
                    className="btn btn-dark mt-auto"
                    data-bs-toggle="modal"
                    data-bs-target={`#${id}`}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}-label`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-dark text-white">
                      <h5 className="modal-title" id={`${id}-label`}>{modalTitle}</h5>
                      <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="alert alert-dark fw-bold fs-5">{description}</div>
                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary"
                        >
                          {linkText} <FontAwesomeIcon icon={faLink} className="ms-2" />
                        </a>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievments;