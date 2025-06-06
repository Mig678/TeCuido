import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../database/firebaseResources';

export default function RequireAuth({ children }) {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return null;
  }

  return user ? children : <Navigate to="/" replace />;
}
