export default function Appointments() {
  const appts = ['Dentist - 10/10', 'Checkup - 11/05'];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <ul className="space-y-2">
        {appts.map((a) => (
          <li key={a} className="p-3 bg-white dark:bg-gray-700 rounded shadow">
            {a}
          </li>
        ))}
      </ul>
      <button className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">
        Add Appointment
      </button>
    </div>
  );
}
