import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  let navigate = useNavigate()
  // Initialize state for profile information
  const [profile, setProfile] = useState({
    name: 'User',
    email: 'user@userhandle',
    image: 'https://via.placeholder.com/150',
    bio: 'Example Bio: Full-stack web developer specializing in React.js, Bootstrap, and modern JavaScript frameworks. Passionate about building interactive and scalable web applications.'
  });

  const [files, setFiles] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
          console.log(xhr.responseText);
          
          if (xhr.status === 200) {
            let userP = JSON.parse(xhr.response)
            console.log(userP);
            if(userP.token){
              document.cookie = `token=${userP.token}; path=/; expires=${new Date(Date.now() + 60*60*24*1000).toUTCString()};`;
            }
            setProfile({
              name: userP.email.replace("@gmail.com" , ""),
              email: userP.email,
              image: 'https://via.placeholder.com/150',
              bio: 'Example Bio: Full-stack web developer specializing in React.js, Bootstrap, and modern JavaScript frameworks. Passionate about building interactive and scalable web applications.'
            })
            setFiles(userP.files)
          }
        };
        
        xhr.onerror = function() {
        console.log("Error:", xhr.responseText);
        };
        
        xhr.open('GET', 'http://localhost:8086/profile', true);
        xhr.withCredentials = true;
        
        xhr.send();
      } catch (error) {
        console.log('Authentication error:', error);
      }
    };
    if(document.cookie.includes('token=')){
      checkToken();
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  let handleDelete = (e)=>{
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      console.log("sent");
      window.location.reload()
    }
    
    xhr.onerror = function() {
    console.log("Error:", xhr.responseText);
    };
    
    xhr.open('GET', `http://localhost:8086/delete/files/${e.target.getAttribute('data-medhat')}`, true);
    xhr.withCredentials = true;
    xhr.send();
  }

  return (
    <div className="user-profile container-fluid p-5 mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-md-6 text-center mb-4">

              {/* Profile Image */}
              <img
                src={profile.image}
                alt="Profile"
                className="rounded-circle img-thumbnail"
                style={{ width: '150px', height: '150px' }}
              />

              {/* Profile Name & email */}
              <h5 className="mt-3">
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  profile.name
                )}
              </h5>
              <p className="text-muted">
                {editing ? (
                  <input
                    type="text"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  profile.email
                )}
              </p>

              <a href="/Documents/WattWizards - User Manual.pdf" download
              className='d-block'>
                <button className='btn mb-2 justify-content-center'>User Manual</button>
              </a>
              <Link to="/project" className='btn btn-primary'>DevSync</Link>

              {/* Change Image */}
              {editing && (
                <div className="mt-3">
                  <input type="file" className='form-control' onChange={handleImageChange} />
                </div>
              )}
            </div>

            {/* Profile Details Section */}
            <div className="col-lg-8 col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>About Me</h4>
              </div>

              {/* Bio */}
              {editing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                />
              ) : (
                <p>{profile.bio}</p>
              )}
              <hr />

              {/* Recent Files Section */}
              <h5>Recent Files</h5>
              <ul className="list-group">
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <strong>{file.name}</strong>
                      <div>
                        <Link className='text-black text-decoration-none p-2 py-3 badge bg-primary me-2' to={"http://localhost:8086/files/" + file.name} download>
                          Download
                        </Link>
                        <button className='text-black text-decoration-none p-2 py-3 badge bg-danger' data-medhat={file.name} onClick={handleDelete} >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">
                    No Uploaded Data
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Save Changes Button */}
          {editing && (
            <div className="text-center mt-4">
              <button className="btn btn-success" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          )}
          {!editing && (
            <div className="text-center mt-4">
              <button className="btn btn-warning" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;