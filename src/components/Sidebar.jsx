import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Pill, CalendarCheck, Bot } from 'lucide-react';

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const nav = [
    {
      path: '/dashboard/medications',
      label: 'Medications',
      icon: Pill,
    },
    {
      path: '/dashboard/appointments',
      label: 'Appointments',
      icon: CalendarCheck,
    },
    {
      path: '/dashboard/chatbot',
      label: 'Chatbot',
      icon: Bot,
    },
  ];

  const container = {
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <Motion.aside
      initial={false}
      animate={isDesktop || open ? { x: 0 } : { x: -260 }}
      transition={{ type: 'tween' }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] text-[#f5f5dc] md:static md:translate-x-0"
    >
      <Motion.div className="mt-16 p-4 space-y-2" variants={container} initial="hidden" animate="show">
        {nav.map((itemNav) => (
          <Motion.div key={itemNav.path} variants={item}>
            <Link
              to={itemNav.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-transform hover:scale-105 hover:text-sky-500 ${
                location.pathname === itemNav.path ? 'text-sky-500 font-semibold border-r-4 border-sky-500' : ''
              }`}
            >
              <itemNav.icon className="w-5 h-5" />
              <span>{itemNav.label}</span>
            </Link>
          </Motion.div>
        ))}
      </Motion.div>
    </Motion.aside>
  );
}
