import { useEffect, useState } from "react";
import { auth, signIn, logout } from "./database/firebaseResources";
import { onAuthStateChanged } from "firebase/auth";
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
        
        <div className="card-container">
          <h1>
            Welcome to <span className="highlight">TeCuido</span>
          </h1>
          <p className="tagline">
            Helping you stay on top of your meds, one reminder at a time.
          </p>
  
          {user ? (
            <>
              <h2>Hello, {user.displayName}</h2>
              <img src={user.photoURL} alt="Profile" className="profile-img" />
              <button onClick={logout} className="btn">Sign Out</button>
            </>
          ) : (
            <>
              <h2>Please sign in</h2>
              <button onClick={signIn} className="btn">Sign in with Google</button>
            </>
          )}
  
          <p className="description">
            This is your personal medication reminder app.
          </p>
        </div>
  
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
              <p>Never miss a dose get notified right on time.</p>
            </div>
            <div className="feature-card">
              <span className="icon">📈</span>
              <h4>Stay On Track</h4>
              <p>Monitor your routine and build consistency.</p>
            </div>
          </div>
        </section>
  
      </div>
    </div>
  );
}

export default App;
