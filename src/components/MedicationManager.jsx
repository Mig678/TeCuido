import { useEffect, useState } from 'react';

const MedicationManager = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [medications, setMedications] = useState(() => {
    const stored = localStorage.getItem('medications');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    const timers = medications.map((med) => {
      const [hours, minutes] = med.time.split(':');
      const now = new Date();
      const alarm = new Date();
      alarm.setHours(Number(hours));
      alarm.setMinutes(Number(minutes));
      alarm.setSeconds(0);
      if (alarm.getTime() <= now.getTime()) {
        alarm.setDate(alarm.getDate() + 1);
      }
      const delay = alarm.getTime() - now.getTime();
      const id = setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Time to take ${med.name}`);
        }
      }, delay);
      return id;
    });

    return () => {
      timers.forEach((id) => clearTimeout(id));
    };
  }, [medications]);

  const requestPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const addMedication = (e) => {
    e.preventDefault();
    if (!name || !time) return;
    setMedications([...medications, { name, time }]);
    setName('');
    setTime('');
  };

  return (
    <div className="medication-manager">
      <h3>Your Medications</h3>
      <form onSubmit={addMedication} className="medication-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Medication name"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit" onClick={requestPermission} className="btn">
          Add
        </button>
      </form>
      <ul className="medication-list">
        {medications.map((med, idx) => (
          <li key={idx}>
            {med.name} at {med.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationManager;
