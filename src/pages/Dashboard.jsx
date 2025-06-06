import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center bg-gray-900 text-white p-4">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
          className="mr-2"
        >
          ☰
        </button>
        <span className="text-lg font-bold">TeCuido</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 space-y-6 p-6 md:sticky md:top-0 md:h-screen ${
          sidebarOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <nav className="flex flex-col gap-3">
          <Link to="/medications" className="hover:underline">
            Medications
          </Link>
          <Link to="/appointments" className="hover:underline">
            Appointments
          </Link>
          <Link to="/chatbot" className="hover:underline">
            Chatbot
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}