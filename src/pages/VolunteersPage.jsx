<<<<<<< Updated upstream
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
=======
// 🛠️ VOLUNTEERS PAGE FULL WORKING VERSION (UPDATED)

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import styles from '../assets/styles/VolunteersPage.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VolunteersPage = () => {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [volunteerLocation, setVolunteerLocation] = useState(null);
  const navigate = useNavigate();

  // 🔒 Check if user is logged in and has volunteer role
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return navigate('/login');
      setUser(currentUser);
    });
  }, [navigate]);

  // 📍 Get volunteer's location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setVolunteerLocation({ lat: latitude, lng: longitude });
        fetchNearbyRequests(latitude, longitude);
      },
      (err) => alert('Location permission is required to fetch nearby donations.')
    );
  };

  // 📏 Haversine formula to calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 📦 Fetch Pending Donations Nearby
  const fetchPendingDonations = async (lat, lng) => {
    try {
      const q = query(
        collection(db, 'donations'),
        where('status', '==', 'Pending')
      );
      const snapshot = await getDocs(q);
      const donations = [];
  
      console.log("🔍 Checking donations...");
  
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        console.log("📄 Donation:", data);
  
        if (data.latitude && data.longitude) {
          const distance = calculateDistance(
            lat,
            lng,
            data.latitude,
            data.longitude
          );
          console.log(`📏 Distance: ${distance.toFixed(2)} km`);
  
          if (distance <= 10) {
            donations.push({ id: docSnap.id, ...data });
          }
        } else {
          console.warn("❌ Skipping donation without lat/lng:", data);
        }
      });
  
      console.log("✅ Final Donations to show:", donations);
      setRequests(donations.slice(0, 4));
    } catch (error) {
      console.error('🔥 Error fetching donations:', error);
    }
  };

  // ✅ Assign Donation to Volunteer
  const handleAcceptRequest = async (request) => {
    alert(`Route from your location to ${request.pickupLocationText} will be shown.`);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${volunteerLocation.lat},${volunteerLocation.lng}&destination=${request.latitude},${request.longitude}`;
    window.open(mapsUrl, '_blank');

    await updateDoc(doc(db, 'donations', request.id), {
      status: 'Assigned',
      assignedVolunteerId: user.uid,
    });
>>>>>>> Stashed changes
  };

  return (
    <>
      <Navbar />
      <div className={styles.backgroundWrapper}>
        <div className={styles.volunteersPage}>
<<<<<<< Updated upstream
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <div className={styles.heroOverlay}></div>
            <h1>Be the reason someone smiles today.</h1>
            <button className={styles.ctaButton}>View Requests Near You</button>
          </div>

          {/* Nearby Food Pickup Requests */}
=======
          <div className={styles.heroSection}>
            <div className={styles.heroOverlay}></div>
            <h1>Be the reason someone smiles today.</h1>
            <button onClick={getLocation} className={styles.ctaButton}>
              View Requests Near You
            </button>
          </div>

>>>>>>> Stashed changes
          <div className={styles.pickupRequests}>
            <h2>Nearby Food Pickup Requests</h2>
            <div className={styles.requestsList}>
              {requests.map((request) => (
                <div key={request.id} className={styles.requestCard}>
<<<<<<< Updated upstream
                  <p>📍 Location: {request.location}</p>
                  <p>📦 Quantity: {request.quantity}</p>
                  <p>📅 Expiry: {request.expiry}</p>
                  <p>📞 Donor Contact: {request.donorContact}</p>
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
=======
                  <p>📍 Location: {request.pickupLocationText}</p>
                  <p>📦 Quantity: {request.quantity}</p>
                  <p>📅 Expiry: {request.expiryDate}</p>
                  <p>📞 Donor Contact: {request.contactNumber}</p>
                  <button
                    onClick={() => handleAcceptRequest(request)}
>>>>>>> Stashed changes
                    className={styles.acceptButton}
                  >
                    Accept & Optimize Route
                  </button>
                </div>
              ))}
            </div>
          </div>

<<<<<<< Updated upstream
          {/* Volunteer Info */}
=======
>>>>>>> Stashed changes
          <div className={styles.volunteerInfo}>
            <h2>Your Volunteer Profile</h2>
            <p>🎖️ Badge: Silver Helper</p>
            <p>✅ Tasks Completed: 15</p>
          </div>

<<<<<<< Updated upstream
          {/* Leaderboard */}
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export default VolunteersPage;
=======
export default VolunteersPage;
>>>>>>> Stashed changes
