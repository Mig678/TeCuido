import { Search, Sun, CheckCircle, User } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <div
      className="w-full max-w-full sm:px-8 sm:py-6 p-4 bg-[#101828]/80 rounded-2xl shadow-2xl border border-[#1e293b] backdrop-blur-md text-white transition-all duration-300
      flex flex-col
      sm:grid sm:grid-cols-2 sm:gap-6
      lg:block lg:max-w-[360px] lg:p-4 xl:p-6"
      style={{ background: 'rgba(11,17,32,0.85)' }}
    >
      {/* Header (spans both columns on grid) */}
      <div className="flex items-center justify-between mb-2 sm:col-span-2 lg:col-span-1">
        <h2 className="text-sm md:text-base font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-3">
          <button className="p-1 rounded focus:outline-none">
            <Search className="w-5 h-5 text-slate-300" />
          </button>
          <button className="p-1 rounded focus:outline-none">
            <Sun className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-[#111927]/80 border border-[#22304a] rounded-xl p-2 md:p-3 flex-1 mb-4">
        <h3 className="text-xs font-semibold text-slate-200 mb-2">Upcoming Appointments</h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center justify-center w-9 md:w-10">
              <span className="text-[10px] font-bold text-teal-300">Apr</span>
              <span className="text-sm md:text-base font-bold text-teal-300">23</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-100">5:30 AM</div>
              <div className="text-[10px] text-slate-400">Doctor’s appointment</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center justify-center w-9 md:w-10">
              <span className="text-[10px] font-bold text-teal-300">Apr</span>
              <span className="text-sm md:text-base font-bold text-teal-300">25</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-100">1:00 PM</div>
              <div className="text-[10px] text-slate-400">Physical therapy</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center justify-center w-9 md:w-10">
              <span className="text-[10px] font-bold text-teal-300">Apr</span>
              <span className="text-sm md:text-base font-bold text-teal-300">26</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-100">10:30 AM</div>
              <div className="text-[10px] text-slate-400">Check up</div>
            </div>
          </div>
        </div>
      </div>

      {/* Medication Reminders */}
      <div className="bg-[#111927]/80 border border-[#22304a] rounded-xl p-2 md:p-3 flex-1 mb-4">
        <h3 className="text-xs font-semibold text-slate-200 mb-2">Medication Reminders</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-slate-100 flex-1">Lisinopril</span>
            <span className="text-xs text-teal-300 font-semibold">8:00 AM</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-slate-100 flex-1">Metformin</span>
            <span className="text-xs text-teal-300 font-semibold">6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Family Chat Reminders */}
      <div className="bg-[#111927]/80 border border-[#22304a] rounded-xl p-2 md:p-3 flex-1 mb-4">
        <h3 className="text-xs font-semibold text-slate-200 mb-2">Family Chat Reminders</h3>
        <div className="flex items-center gap-2 mb-1">
          <User className="w-6 h-6 text-teal-400 bg-[#11213a] rounded-full p-1" />
          <User className="w-6 h-6 text-teal-400 bg-[#11213a] rounded-full p-1" />
          <User className="w-6 h-6 text-teal-400 bg-[#11213a] rounded-full p-1" />
        </div>
        <input
          type="text"
          disabled
          placeholder="Write a message…"
          className="w-full bg-[#1e293b] text-slate-400 text-xs rounded-lg px-3 py-2 mt-1 border border-[#22304a] opacity-60 cursor-not-allowed placeholder:text-slate-500"
        />
      </div>

      {/* Family Chat */}
      <div className="bg-[#111927]/80 border border-[#22304a] rounded-xl p-2 md:p-3 flex-1">
        <h3 className="text-xs font-semibold text-slate-200 mb-2">Family Chat</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-300">Mom:</span>
            <span className="text-xs text-slate-100">“Took my meds!”</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-300">You:</span>
            <span className="text-xs text-slate-100">“Doctor said to check BP daily.”</span>
          </div>
        </div>
      </div>
    </div>
  );
} 