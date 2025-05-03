import React, { useState } from 'react';
import styles from "../assets/styles/DonorsPage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DonorsPage = () => {
  const [spoilageStatus, setSpoilageStatus] = useState("✅ Acceptable");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate("/register");
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;
  
    if (!user) {
      alert("You need to register before donating.");
      window.location.href = "/register";
      return;
    }
  
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const userData = docSnap.data();
      if (userData.role !== "donor") {
        alert("Only registered donors can donate food.");
        return;
      }
  
      // ✅ User is donor – allow form submission
      alert("Thank you for your donation!");
      // TODO: Save form data to Firestore
    } else {
      alert("User data not found. Please register again.");
      window.location.href = "/register";
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.backgroundWrapper}>
        <div className={styles.donorsPage}>
          /* Hero Section */
          <div className={styles.heroSection}>
            <div className={styles.heroOverlay}></div>
            <h1>Your extra is someone’s enough.</h1>
            <button
              className={styles.ctaButton}
              onClick={async () => {
                const auth = getAuth();
                const user = auth.currentUser;
              
                if (!user) {
                  window.location.href = "/register"; // Not logged in, redirect
                  return;
                }
              
                const db = getFirestore();
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
              
                if (docSnap.exists()) {
                  const userData = docSnap.data();
                  if (userData.role === "donor") {
                    alert("You're a verified donor. You can donate food.");
                    // Optionally scroll to the donation form
                    document
                      .querySelector(`.${styles.donationFormSection}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    alert("Only users registered as donors can donate food.");
                    window.location.href = "/register";
                  }
                } else {
                  alert("User data not found. Please register again.");
                  window.location.href = "/register";
                }
              }}
            >
              Donate Now
            </button>
          </div>

          /* Donation Form */
          <div className={styles.donationFormSection}>
            <h2>Donate Food</h2>
            <form className={styles.donorForm} onSubmit={handleFormSubmit}>
              <div className={styles.formGroup}>
                <label>🍱 Food Item</label>
                <input type="text" placeholder="Food Item" required />
              </div>
              <div className={styles.formGroup}>
                <label>📦 Quantity (in kg)</label>
                <input type="number" placeholder="Quantity" required />
              </div>
              <div className={styles.formGroup}>
                <label>📅 Manufacture Date</label>
                <input type="date" required />
              </div>
              <div className={styles.formGroup}>
                <label>📅 Expiry Date</label>
                <input type="date" required />
              </div>
              <div className={styles.formGroup}>
                <label>📍 Pickup Location</label>
                <input type="text" placeholder="Pickup Location" required />
              </div>
              <div className={styles.formGroup}>
                <label>📞 Contact Number</label>
                <input type="tel" placeholder="Contact Number" required />
              </div>
              <div className={styles.formGroup}>
                <label>📸 Upload Image</label>
                <input type="file" />
              </div>
              <div className={styles.spoilageStatus}>
                Status: <span>{spoilageStatus}</span>
              </div>
              <button type="submit" className={styles.submitButton}>
  Submit Donation
</button>
            </form>
          </div>

          {/* Donation History */}
          <div className={styles.donationHistory}>
            <h2>Your Donation History</h2>
            <div className={styles.historyCards}>
              <div className={styles.historyCard}>
                <img src="example.jpg" alt="Donation" />
                <p>Status: ✅ Accepted</p>
                <p>Date: 2023-10-01</p>
                <p>Volunteer: John Doe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonorsPage;