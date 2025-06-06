import { useEffect, useState } from 'react';

export default function Appointments() {
  const [appts, setAppts] = useState(() => {
    const stored = localStorage.getItem('appointments');
    return stored ? JSON.parse(stored) : ['Dentist - 10/10', 'Checkup - 11/05'];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appts));
  }, [appts]);

  const addAppt = (e) => {
    e.preventDefault();
    const text = e.target.appt.value.trim();
    if (text) {
      setAppts([...appts, text]);
      e.target.reset();
    }
  };

  const removeAppt = (idx) => {
    setAppts(appts.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <ul className="space-y-2">
        {appts.map((a, idx) => (
          <li key={idx} className="p-3 bg-white dark:bg-gray-700 rounded shadow flex justify-between items-center">
            {a}
            <button onClick={() => removeAppt(idx)} className="text-sm text-red-500">Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addAppt} className="flex gap-2">
        <input
          name="appt"
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          placeholder="New appointment"
        />
        <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">Add</button>
      </form>
    </div>
  );
}
