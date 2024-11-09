import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <div className='alert alert-danger' style={{fontWeight: 'bold',fontSize: '18px',textAlign: 'center', margin: '140px'}}>
      <h1>Error 404</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
