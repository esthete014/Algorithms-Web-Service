import { useRef, useState, useEffect } from "react";
import "./styles.css";
import PropTypes from "prop-types"; // Импортируем PropTypes
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { buildApiUrl } from "./GetHost";
const allTabs = [
  {
    id: "Log in",
    name: "Log in",
  },
  {
    id: "Register",
    name: "Sign in",
  },
];

const Register = ({ isLocal }) => {
  const [login, setLogin] = useState(""); // Состояние для логина
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0); // Устанавливаем начальный индекс на 0
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabsRef = useRef([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mode = allTabs[activeTabIndex].id; // Получаем текущий режим (Log in или Register)
    const additionalPath = mode === "Log in" ? "/v2/login" : "/v2/register"; // Определяем путь
    const url = buildApiUrl(isLocal, additionalPath); // Получаем полный URL

    const formData = {
      login: login, // Используем состояние для логина
      password: password, // Используем состояние для пароля
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(formData),
        //credentials: 'include',
      });

      if (!response.ok) {
        // Обработка ошибок, если ответ не успешен
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      //cookies.set("token", data["JWT"]);
      console.log(data); // Обработка ответа от сервера

      if (mode === "Log in") {
        // Если вход успешен, сохраняем данные пользователя
        localStorage.setItem("user", JSON.stringify(data.user));

        // Проверяем, является ли пользователь администратором
        const adminCheckResponse = await fetch(
          "http://26.13.2.150:8080/v2/is-admin",
          {
            method: "POST", // Изменено на POST
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",

              //"Authorization": `Bearer ${data.token}`, // Если требуется токен для авторизации
            },
            body: JSON.stringify({ token: data["JWT"] }), // Передаем необходимые данные, если требуется
          }
        );

        if (!adminCheckResponse.ok) {
          throw new Error("Failed to check admin status");
        }

        const isAdminData = await adminCheckResponse.json();
        document.cookie = data["JWT"];
        console.log(isAdminData);
        if (isAdminData.isAdmin === "true") {
          localStorage.setItem("isAdmin", true);
          console.log("User  is admin");
          // Здесь вы можете перенаправить админа на другую страницу
          navigate("/ListTasks"); // Пример перенаправления для админа
        } else {
          localStorage.setItem("isAdmin", false);
          console.log("User  is not admin");
          navigate("/ListTasks"); // Перенаправление для обычного пользователя
        }
      } else {
        // Если регистрация успешна, можно перенаправить на страницу входа или показать сообщение
        alert("Registration successful! You can now log in.");
        setActiveTabIndex(0); // Переключаемся на Log in
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Устанавливаем состояние загрузки в false
    }
  };

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      if (currentTab) {
        setTabUnderlineLeft(currentTab.offsetLeft);
        setTabUnderlineWidth(currentTab.clientWidth);
      }
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div>
      <div style={styles.tabBar}>
        <span
          style={{
            ...styles.tabUnderline,
            left: tabUnderlineLeft,
            width: tabUnderlineWidth,
          }}
        />
        {allTabs.map((tab, index) => {
          const isActive = activeTabIndex === index;

          return (
            <button
              key={tab.id} // Используем id для ключа
              ref={(el) => (tabsRef.current[index] = el)}
              style={{
                ...styles.tabButton,
                color: isActive ? "white" : "#ccc",
              }}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
      <div className="container" style={{ marginTop: 15 }}>
        <h2>{allTabs[activeTabIndex].name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="login" // Исправлено имя на "login"
            placeholder="Username"
            value={login} // Используем состояние для логина
            onChange={(e) => setLogin(e.target.value)} // Обновляем состояние при вводе
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password} // Используем состояние для пароля
            onChange={(e) => setPassword(e.target.value)} // Обновляем состояние при вводе
            required
          />
          <Button
            type="submit"
            sx={{
              color: "#ffffff",
              backgroundColor: "#007bff",
              marginTop: 3,
              "&:hover": { backgroundColor: "#1976d2" },
            }}
            disabled={loading}
          >
            {/* {allTabs[activeTabIndex].name} */}
            {loading ? "Загрузка..." : allTabs[activeTabIndex].name}
          </Button>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  isLocal: PropTypes.bool.isRequired, // Указываем, что isLocal является обязательным булевым значением
};

const styles = {
  tabBar: {
    display: "flex",
    position: "relative",
    height: "48px",
    borderRadius: "24px",
    border: "1px solid rgba(0, 0, 0, 0.4)",
    backgroundColor: "#2d2d2d",
    overflow: "hidden",
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    height: "100%",
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    transition: "all 0.3s ease",
    borderRadius: "24px",
  },
  tabButton: {
    flex: 1,
    cursor: "pointer",
    border: "none",
    borderRadius: "24px",
    padding: "10px 20px",
    backgroundColor: "transparent",
    fontWeight: "lighter",
    outline: "none",
    transition: "color 0.3s ease",
  },
};

export default Register;
