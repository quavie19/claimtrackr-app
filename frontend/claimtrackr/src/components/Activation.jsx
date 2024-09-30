import React, { useState } from 'react';

//css
import '../css/activate.css';

function Activation() {
  const [policy_number, setPolicy] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [zip_code, setZipCode] = useState('');

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      const body = { policy_number, phone_number, zip_code };
      const response = await fetch('http://localhost:4000/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">ClaimTrackr</div>
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
      </nav>
      {/* ONLINE ACTIVATION HEADER*/}
      <div className="bg-secondary pt-5 pb-5 ">
        <h1 className="ms-5 me-5">Online Activation</h1>
        <i className="bi bi-person-circle"></i>
      </div>
      {/* ACTIVATION FORM */}
      <form className="container" onSubmit={createAccount}>
        <div className="mb-3 mt-3">
          <label className="form-label">Policy Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter policy"
            value={policy_number}
            onChange={(e) => setPolicy(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="number"
            className="form-control"
            placeholder="123-456-7890"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Zip Code</label>
          <input
            type="number"
            className="form-control"
            placeholder="34953"
            value={zip_code}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="form-check mb-3">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              name="remember"
            />{' '}
            Agree to terms & conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Activation;
