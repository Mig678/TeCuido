import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const nav = [
    {
      path: '/dashboard/medications',
      label: 'Medications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 11h10M7 15h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      path: '/dashboard/appointments',
      label: 'Appointments',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      path: '/dashboard/chatbot',
      label: 'Chatbot',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-6 4h8m5-9a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-800 text-gray-100 transition-transform duration-200 md:translate-x-0 md:static md:inset-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="mt-16 p-4 space-y-2">
        {nav.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition ${location.pathname === item.path ? 'bg-gray-700 text-indigo-400' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
