import React, { useState } from 'react';
import styles from "../assets/styles/VolunteersPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const VolunteersPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      location: "123 Main St, Cityville",
      quantity: "10 kg",
      expiry: "2023-10-05",
      donorContact: "123-456-7890",
    },
    {
      id: 2,
      location: "456 Elm St, Townsville",
      quantity: "5 kg",
      expiry: "2023-10-06",
      donorContact: "987-654-3210",
    },
  ]);

  const handleAcceptRequest = (id) => {
    alert(`Request ${id} accepted!`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.backgroundWrapper}>
        <div className={styles.volunteersPage}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroOverlay}></div>
            <h1>Be the reason someone smiles today.</h1>
            <button className={styles.ctaButton}>View Requests Near You</button>
          </div>

          {/* Nearby Food Pickup Requests */}
          <div className={styles.pickupRequests}>
            <h2>Nearby Food Pickup Requests</h2>
            <div className={styles.requestsList}>
              {requests.map((request) => (
                <div key={request.id} className={styles.requestCard}>
                  <p>📍 Location: {request.location}</p>
                  <p>📦 Quantity: {request.quantity}</p>
                  <p>📅 Expiry: {request.expiry}</p>
                  <p>📞 Donor Contact: {request.donorContact}</p>
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className={styles.acceptButton}
                  >
                    Accept & Optimize Route
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Info */}
          <div className={styles.volunteerInfo}>
            <h2>Your Volunteer Profile</h2>
            <p>🎖️ Badge: Silver Helper</p>
            <p>✅ Tasks Completed: 15</p>
          </div>

          {/* Leaderboard */}
          <div className={styles.leaderboard}>
            <h2>Top Volunteers</h2>
            <ul>
              <li>1. John Doe - 25 pickups</li>
              <li>2. Jane Smith - 20 pickups</li>
              <li>3. Alex Johnson - 18 pickups</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VolunteersPage;