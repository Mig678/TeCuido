import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">TeCuido</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/dashboard/medications" className="hover:underline">Medications</Link>
        <Link to="/dashboard/appointments" className="hover:underline">Appointments</Link>
        <Link to="/dashboard/chatbot" className="hover:underline">Chatbot</Link>
      </nav>
    </div>
  );
}
