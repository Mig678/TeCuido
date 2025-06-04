import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signIn, logout } from "./database/firebaseResources";
import MedicationManager from "./components/MedicationManager";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <div className="card-wrapper">

        <section className="hero">
          <h1>
            Welcome to <span className="highlight">TeCuido</span>
          </h1>
          <p className="tagline">Never miss a dose</p>
  
          {user ? (
            <>
              <h2>Hello, {user.displayName}</h2>
              <img src={user.photoURL} alt="Profile" className="profile-img" />
              <button onClick={logout} className="btn">Sign Out</button>
            </>
          ) : (
            <button onClick={signIn} className="btn cta-btn">Get Started</button>
          )}
  
          <p className="description">
            This is your personal medication reminder app.
          </p>
        </section>
  
        <section className="features">
          <h3>How it works</h3>
          <div className="features-container">
            <div className="feature-card">
              <span className="icon">📋</span>
              <h4>Add Medications</h4>
              <p>Keep track of your daily prescriptions with ease.</p>
            </div>
            <div className="feature-card">
              <span className="icon">⏰</span>
              <h4>Timely Reminders</h4>
              <p>Never miss a dose, get notified right on time.</p>
            </div>
            <div className="feature-card">
              <span className="icon">📈</span>
              <h4>Stay On Track</h4>
              <p>Monitor your routine and build consistency.</p>
            </div>
          </div>
        </section>

        {user && <MedicationManager />}

      </div>
    </div>
  );
}

export default App;
