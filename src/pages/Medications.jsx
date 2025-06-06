export default function Medications() {
  const meds = ['Ibuprofen', 'Aspirin'];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Medications</h1>
      <ul className="space-y-2">
        {meds.map((m) => (
          <li key={m} className="p-3 bg-white dark:bg-gray-700 rounded shadow">
            {m}
          </li>
        ))}
      </ul>
      <button className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">
        Add Medication
      </button>
    </div>
  );
}
