import React, { useState, useEffect } from "react";
import CustomSelect from './components/CustomSelect';
import "./styles.css";

function LoginForm({ onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === "Admin" && password === "O140emYS8*Pf3~Y~*(c2RLrww837LNXR0yA4zOt:H/`Y5?tkH," || login === "Manager" && password === "I0+T|Qo8'c{&3g172)NPZc(3jXEe9XGAdk{,fHJ8>,%4)M.N3r") {
      onLogin();
    }else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="Login-Auth-Text">Вход в админ-панель</h2>
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

function MainApp() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      try {
        return JSON.parse(saved).sort((a, b) =>
          a.first_name.localeCompare(b.first_name)
        );
      } catch {
        return [];
      }
    }
    return [];
  });

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    position: "",
    gender: "",
    age: "",
    avatar_url: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterAgeMin, setFilterAgeMin] = useState("");
  const [filterAgeMax, setFilterAgeMax] = useState("");

  const [sortField, setSortField] = useState("first_name");
  const [sortDirection, setSortDirection] = useState("asc");

  const [darkTheme, setDarkTheme] = useState(() => {
    const saved = localStorage.getItem("darkTheme");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
    if (darkTheme) document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  }, [darkTheme]);

  const filteredSortedUsers = users
    .filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      if (!fullName.includes(searchText.toLowerCase())) return false;
      if (filterGender && user.gender !== filterGender) return false;
      if (
        filterPosition &&
        !user.position.toLowerCase().includes(filterPosition.toLowerCase())
      )
        return false;
      if (filterAgeMin && Number(user.age) < Number(filterAgeMin)) return false;
      if (filterAgeMax && Number(user.age) > Number(filterAgeMax)) return false;
      return true;
    })
    .sort((a, b) => {
      let v1 = a[sortField];
      let v2 = b[sortField];
      if (sortField === "age") {
        v1 = Number(v1) || 0;
        v2 = Number(v2) || 0;
      } else {
        v1 = String(v1 || "").toLowerCase();
        v2 = String(v2 || "").toLowerCase();
      }
      if (v1 < v2) return sortDirection === "asc" ? -1 : 1;
      if (v1 > v2) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      if (/^\d*$/.test(value)) setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "email") {
      setFormData((prev) => ({ ...prev, email: value }));
      const namePart = value.split("@")[0];
      if (namePart) setFormData((prev) => ({ ...prev, first_name: namePart }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openAddForm = () => {
    setFormData({
      email: "",
      first_name: "",
      last_name: "",
      position: "",
      gender: "",
      age: "",
      avatar_url: "",
    });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setFormData({
      ...user,
      email: "",
      age: user.age !== null && user.age !== undefined ? String(user.age) : "",
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.first_name.trim() || !formData.last_name.trim()) {
      alert("Имя и фамилия обязательны");
      return;
    }
    if (formData.email && !validateEmail(formData.email)) {
      alert("Введите корректный email");
      return;
    }

    const payload = {
      ...formData,
      age: formData.age === "" ? null : Number(formData.age),
    };

    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...u, ...payload, id: editingId } : u))
      );
      setEditingId(null);
    } else {
      const maxId = users.reduce((max, u) => (u.id > max ? u.id : max), 0);
      const newUser = { ...payload, id: maxId + 1 };
      setUsers((prev) => [...prev, newUser]);
      setNewlyAddedId(maxId + 1);
      setTimeout(() => setNewlyAddedId(null), 3000);
    }

    setShowForm(false);
    setFormData({
      email: "",
      first_name: "",
      last_name: "",
      position: "",
      gender: "",
      age: "",
      avatar_url: "",
    });
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
    setDeleteUserId(null);
  };

  return (
    <div className={`app-container ${darkTheme ? "dark-theme" : ""}`}>
      <h2>Список участников</h2>

      <div className="theme-toggle">
        <input
          id="dark-theme-toggle"
          type="checkbox"
          checked={darkTheme}
          onChange={() => setDarkTheme(!darkTheme)}
        />
        <label htmlFor="dark-theme-toggle">Тёмная тема</label>
      </div>

      <div className="app-layout">
        <aside className="sidebar">
          <input
            placeholder="Поиск по имени/фамилии"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="filter-input"
          />

          <CustomSelect
            value={filterGender}
            onChange={setFilterGender}
            options={[
              { value: "", label: "Все полы" },
              { value: "Мужской", label: "Мужской" },
              { value: "Женский", label: "Женский" },
            ]}
          />

          <input
            placeholder="Фильтр по должности"
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="filter-input"
          />

          <input
            placeholder="Мин. возраст"
            value={filterAgeMin}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setFilterAgeMin(e.target.value);
            }}
            className="filter-input"
          />

          <input
            placeholder="Макс. возраст"
            value={filterAgeMax}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setFilterAgeMax(e.target.value);
            }}
            className="filter-input"
          />

<CustomSelect
  value={sortField}
  onChange={(val) => setSortField(val)}
  options={[
    { value: "first_name", label: "Имя" },
    { value: "last_name", label: "Фамилия" },
    { value: "position", label: "Должность" },
    { value: "gender", label: "Пол" },
    { value: "age", label: "Возраст" },
  ]}
/>

<CustomSelect
  value={sortDirection}
  onChange={(val) => setSortDirection(val)}
  options={[
    { value: "asc", label: "По возрастанию" },
    { value: "desc", label: "По убыванию" },
  ]}
/>


          <button onClick={openAddForm} className="add-btn" style={{ marginTop: 20 }}>
            Добавить участника
          </button>
        </aside>

        <main className="main-content">
          <table>
            <thead>
              <tr>
                <th>Аватар</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Должность</th>
                <th>Пол</th>
                <th>Возраст</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredSortedUsers.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Нет пользователей
                  </td>
                </tr>
              )}
              {filteredSortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className={user.id === newlyAddedId ? "highlight-new" : ""}
                >
                  <td>
                    <img
                      src={
                        user.avatar_url ||
                        `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
                      }
                      alt="avatar"
                      style={{ width: 40, borderRadius: "50%" }}
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.position}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openEditForm(user)}>✏️</button>
                    <button className="delete-btn-table" onClick={() => setDeleteUserId(user.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showForm && (
            <div className="modal-overlay" onClick={() => setShowForm(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{editingId ? "Редактировать участника" : "Добавить участника"}</h3>
                <form onSubmit={handleSubmit} className="form">
                  <input
                    name="email"
                    placeholder="Email (для автозаполнения)"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    name="first_name"
                    placeholder="Имя"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="last_name"
                    placeholder="Фамилия"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="position"
                    placeholder="Должность"
                    value={formData.position}
                    onChange={handleChange}
                  />
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Пол</option>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                  </select>
                  <input
                    name="age"
                    type="text"
                    placeholder="Возраст"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  <input
                    name="avatar_url"
                    placeholder="Ссылка на аватар"
                    value={formData.avatar_url}
                    onChange={handleChange}
                  />
                  <div className="form-buttons">
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setShowForm(false)}>
                      Отмена
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deleteUserId && (
            <div className="modal-overlay" onClick={() => setDeleteUserId(null)}>
              <div className="modal confirm-delete" onClick={(e) => e.stopPropagation()}>
                <p>Вы точно хотите удалить этого пользователя?</p>
                <div className="confirm-buttons">
                  <button className="cancel-btn" onClick={() => setDeleteUserId(null)}>
                    Отмена
                  </button>
                  <button className="delete-btn" onClick={confirmDelete}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <MainApp />
      )}
    </>
  );
}
