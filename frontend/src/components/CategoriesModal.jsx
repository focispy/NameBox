import React, { useState } from "react";

function CategoriesModal({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.15)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1200,
      }}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 24,
          minWidth: 260,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          userSelect: "none",
        }}
      >
        <h3 style={{ marginBottom: 16, fontWeight: "600", fontSize: 20 }}>
          Категории
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              backgroundColor: "#e3e8ff",
              color: "#2a3a99",
              fontWeight: "600",
              marginBottom: 8,
              cursor: "default",
            }}
          >
            Участники
          </li>
          <li
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              color: "#555",
              marginBottom: 8,
              cursor: "pointer",
              userSelect: "none",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            Пароли
          </li>
          <li
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              color: "#555",
              cursor: "pointer",
              userSelect: "none",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
          >
            В разработке
          </li>
        </ul>
      </div>
    </div>
  );
}

function MainApp() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div>
      {/* Кнопка "Категории" в правом верхнем углу */}
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          cursor: "pointer",
          fontWeight: "600",
          color: "#444",
          userSelect: "none",
          fontSize: 16,
          padding: "6px 12px",
          borderRadius: 6,
          border: "1.5px solid #ccc",
          backgroundColor: "#fafafa",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onClick={() => setShowCategories(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f0f0f0";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#fafafa";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
        }}
        title="Открыть категории"
      >
        Категории
      </div>

      {/* Тут остальное содержимое приложения */}

      {/* Модальное окно с категориями */}
      {showCategories && (
        <CategoriesModal onClose={() => setShowCategories(false)} />
      )}
    </div>
  );
}

export default MainApp;
