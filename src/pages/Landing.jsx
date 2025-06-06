import { useEffect, useState } from 'react';
import { auth, signIn, logout } from '../database/firebaseResources';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Welcome to <span className="text-sky-500">TeCuido</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
        Never miss a dose or appointment. Keep your health on track with reminders and chat support.
      </p>
      {user ? (
        <>
          <Link to="/dashboard" className="px-6 py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Go to Dashboard
          </Link>
          <button onClick={logout} className="mt-4 text-sm text-sky-500 hover:underline">
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={signIn} className="px-6 py-3 rounded bg-sky-500 text-white hover:bg-sky-600 transition">
          Get Started
        </button>
      )}
      <ul className="mt-12 space-y-2 text-left text-gray-600 dark:text-gray-300">
        <li>📋 Add medications with schedules</li>
        <li>⏰ Receive timely reminders</li>
        <li>📈 Track your progress over time</li>
      </ul>
    </div>
  );
}
