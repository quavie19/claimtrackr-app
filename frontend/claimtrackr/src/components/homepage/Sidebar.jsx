import Button from './Button';
import logo from '../../assets/logo/transparent.png';
import React, { useState } from 'react';

import '../../css/sidebar.css';

{
  /* Sidebar */
}
function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <div className="sidebar">
        <img src={logo} alt="logo" />
        <div>
          <h1>Welcome Back!</h1>
          <Button text="Sign In" type="secondary" onClick={toggleModal} />
        </div>
        <div></div>
      </div>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close-btn" onClick={toggleModal}>
            &times;
          </span>
          <div className="modal-form">
            <h1>Log in</h1>
            <form>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" />
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" />
              </div>

              {/* Activate Button */}
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Button text="Log In" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
