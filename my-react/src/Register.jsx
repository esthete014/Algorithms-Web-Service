import { useRef, useState, useEffect } from "react";
import './styles.css';
import PropTypes from "prop-types"; // Импортируем PropTypes
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { buildApiUrl } from './GetHost';

const allTabs = [
    {
        id: "Log in",
        name: "Log in",
    },
    {
        id: "Register",
        name: "Register",
    },
];

const Register = ({ isLocal }) => {
    const [login, setLogin] = useState(''); // Состояние для логина
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState(0); // Устанавливаем начальный индекс на 0
    const tabsRef = useRef([]);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mode = allTabs[activeTabIndex].id; // Получаем текущий режим (Log in или Register)
        const additionalPath = mode === "Log in" ? "/v2/login" : "/v1/register"; // Определяем путь
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
            });

            if (!response.ok) {
                // Обработка ошибок, если ответ не успешен
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Обработка ответа от сервера

            if (mode === "Log in") {
                // Если вход успешен, сохраняем данные пользователя и перенаправляем
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate("/ListTasks");
            } else {
                // Если регистрация успешна, можно перенаправить на страницу входа или показать сообщение
                alert("Registration successful! You can now log in.");
                setActiveTabIndex(0); // Переключаемся на Log in
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert("An error occurred. Please try again.");
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
                    <Button type="submit"
                        sx={{ color: '#ffffff', backgroundColor: '#007bff', marginTop: 3, "&:hover": { backgroundColor: "#1976d2" } }}
                    >
                        {allTabs[activeTabIndex].name}
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
