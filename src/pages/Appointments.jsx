import Sidebar from '../components/Sidebar';

export default function Appointments() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">📅 Appointments</h1>
      </div>
    </div>
  );
}