import React from 'react';

const Header = ({ onAddClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <h1>NameBox</h1>
      <button onClick={onAddClick}>Добавить</button>
    </div>
  );
};

export default Header;
