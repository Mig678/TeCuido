import { useEffect, useState } from 'react';
import { auth, signIn, logout } from '../database/firebaseResources';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

export default function Landing() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
      <Motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full mx-auto my-20 text-center text-[#f5f5dc] font-sans"
      >
        <Motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-bold text-4xl md:text-5xl mb-6"
        >
          Welcome to TeCuido
        </Motion.h1>
        <p className="mb-8 text-[#f5f5dc]/80">
          Never miss a dose or appointment. Keep your health on track with reminders and chat support.
        </p>
        {user ? (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded bg-[#f5f5dc] text-black hover:bg-[#e5e5c4] transition"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={logout}
              className="px-6 py-3 rounded border border-[#f5f5dc] text-[#f5f5dc] hover:bg-[#f5f5dc] hover:text-black transition"
            >
              Sign Out
            </button>
          </Motion.div>
        ) : (
          <Motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={signIn}
            className="px-6 py-3 rounded bg-[#f5f5dc] text-black hover:bg-[#e5e5c4] transition"
          >
            Get Started
          </Motion.button>
        )}
        <Motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-10 flex flex-col items-start gap-4 text-sm font-light mx-auto max-w-fit"
        >
          {['📋 Add medications with schedules', '⏰ Receive timely reminders', '📈 Track your progress over time'].map((t) => (
            <Motion.li key={t} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              {t}
            </Motion.li>
          ))}
        </Motion.ul>
      </Motion.div>
    </div>
  );
}
