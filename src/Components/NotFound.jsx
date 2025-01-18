import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section
      className="d-flex justify-content-center align-items-center bg-image p-5 mt-5"
      style={{
        background: 'url(https://images6.alphacoders.com/108/1080125.jpg) no-repeat',
        backgroundSize: "cover", backgroundPosition: "center"
      }}
    >
      <div className="mask d-flex justify-content-center align-items-center h-100 gradient-custom-3 mt-5">
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase mb-4 text-dark" style={{ fontSize: '3rem' }}>
                    Oops! {axios.HttpStatusCode.NotFound} Page Not Found
                  </h2>
                  <p className="lead mb-4" style={{ fontSize: '1.2rem' }}>
                    The page you're looking for doesn't exist or has been moved. Try navigating back to our homepage.
                  </p>
                  <Link to="/" className="btn btn-primary btn-lg text-light">Go to Homepage</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;