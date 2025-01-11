import React, { useEffect, useState } from 'react';

function Profile() {
  // Initialize state for profile information
  const [profile, setProfile] = useState({
    name: 'User',
    username: '@userhandle',
    image: 'https://via.placeholder.com/150',
    bio: 'Example Bio: Full-stack web developer specializing in React.js, Bootstrap, and modern JavaScript frameworks. Passionate about building interactive and scalable web applications.'
  });

  const [files, setFiles] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    const storedFiles = JSON.parse(localStorage.getItem('files'));
    if (storedProfile) {
      setProfile(storedProfile);
    }
    if (storedFiles) {
      setFiles(storedFiles);
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

              {/* Profile Name & Username */}
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
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : (
                  profile.username
                )}
              </p>

              {/* Change Image */}
              {editing && (
                <div className="mt-3">
                  <input type="file" onChange={handleImageChange} />
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

              {/* Recent Repositories Section */}
              <h5>Recent Repositories</h5>
              <ul className="list-group">
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <strong>{file.name}</strong>
                      <span className="badge bg-primary">
                        {file.category || 'No Category'}
                      </span>
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