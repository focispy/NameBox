import React from 'react';

const UserTable = ({ users, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Должность</th>
          <th>Пол</th>
          <th>Возраст</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.position}</td>
            <td>{user.gender}</td>
            <td>{user.age}</td>
            <td>
              <button onClick={() => onDelete(user.id)} style={{ background: '#ef4444' }}>
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
