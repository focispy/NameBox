import React, { useState, useRef, useEffect } from 'react';
import '../styles/CustomSelect.css';


const CustomSelect = ({ options, value, onChange, placeholder = 'Выберите...' }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="custom-select__control" onClick={() => setOpen(!open)}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="custom-select__arrow">▾</span>
      </div>
      {open && (
        <div className="custom-select__menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`custom-select__option ${value === opt.value ? 'selected' : ''}`}
onClick={() => {
  onChange(opt.value);
  setOpen(false);
}}

            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
