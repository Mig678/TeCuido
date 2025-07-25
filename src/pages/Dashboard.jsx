import { auth, logout } from '../database/firebaseResources';

export default function Dashboard() {
  const user = auth.currentUser;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-indigo-500"
        />
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.displayName}</h1>
        <p className="text-lg text-gray-600 mb-6">{user.email}</p>
        <button
          onClick={logout}
          className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 