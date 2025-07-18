import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === "Admin" && password === "AdminAdminAdmin") {
      onLogin();
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Вход в админ-панель</h2>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
