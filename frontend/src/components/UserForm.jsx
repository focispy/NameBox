import React, { useState } from 'react';

const initialState = {
  first_name: '',
  last_name: '',
  position: '',
  gender: 'Мужской',
  age: '',
};

const UserForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.first_name || !form.last_name) return alert('Введите имя и фамилию');
    onAdd(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1rem', borderRadius: '10px' }}>
      <input name="first_name" placeholder="Имя" value={form.first_name} onChange={handleChange} />
      <input name="last_name" placeholder="Фамилия" value={form.last_name} onChange={handleChange} />
      <input name="position" placeholder="Должность" value={form.position} onChange={handleChange} />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option>Мужской</option>
        <option>Женский</option>
        <option>Другой</option>
      </select>
      <input name="age" type="number" placeholder="Возраст" value={form.age} onChange={handleChange} />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default UserForm;
