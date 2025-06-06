import { useEffect, useState } from 'react';

export default function Medications() {
  const [meds, setMeds] = useState(() => {
    const stored = localStorage.getItem('medications');
    return stored ? JSON.parse(stored) : ['Ibuprofen', 'Aspirin'];
  });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(meds));
  }, [meds]);

  const addMed = (e) => {
    e.preventDefault();
    const text = e.target.med.value.trim();
    if (text) {
      setMeds([...meds, text]);
      e.target.reset();
    }
  };

  const removeMed = (idx) => {
    setMeds(meds.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Medications</h1>
      <ul className="space-y-2">
        {meds.map((m, idx) => (
          <li key={idx} className="p-3 bg-white dark:bg-gray-700 rounded shadow flex justify-between items-center">
            {m}
            <button onClick={() => removeMed(idx)} className="text-sm text-red-500">Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addMed} className="flex gap-2">
        <input
          name="med"
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          placeholder="New medication"
        />
        <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">Add</button>
      </form>
    </div>
  );
}
