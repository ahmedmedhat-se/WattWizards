import axios from 'axios';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <section
        className="d-flex justify-content-center align-items-center bg-image p-5"
        style={{
          background: 'url(https://images6.alphacoders.com/108/1080125.jpg) no-repeat',
          backgroundSize: "cover", backgroundPosition: "center", height: "100vh"
        }}
      >
        <div className="mask d-flex justify-content-center align-items-center h-100 gradient-custom-3 mt-5">
          <div className="container text-center">
            <div className="row">
              <div className="col-12">
                <div className="card bg-dark" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase mb-4 fw-bold" style={{ fontSize: '3rem' }}>
                      Oops! {axios.HttpStatusCode.NotFound} Page Not Found
                    </h2>
                    <p className="text-light mb-4" style={{ fontSize: '1.2rem' }}>
                      The page you're looking for doesn't exist or has been moved. Try navigating back to our homepage.
                    </p>
                    <Link to="/wattwizards" className="btn btn-primary btn-lg text-light">Go to Homepage</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;