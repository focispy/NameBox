import React, { useState } from 'react';

export default function AddUserForm({ onAdd }) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    position: '',
    gender: '',
    age: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.first_name || !form.last_name) {
      alert('Введите имя и фамилию');
      return;
    }
    onAdd(form);
    setForm({ first_name: '', last_name: '', position: '', gender: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" placeholder="Имя" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Фамилия" value={form.last_name} onChange={handleChange} required />
      <input name="position" placeholder="Должность" value={form.position} onChange={handleChange} />
      <input name="gender" placeholder="Гендер" value={form.gender} onChange={handleChange} />
      <input
        name="age"
        type="number"
        placeholder="Возраст"
        value={form.age}
        onChange={handleChange}
        min="0"
      />
      <button type="submit">Добавить пользователя</button>
    </form>
  );
}
