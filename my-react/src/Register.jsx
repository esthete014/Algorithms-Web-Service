import { useRef, useState, useEffect } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
  

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", formData.username);
        console.log("Password:", formData.password);

        // Сохраняем данные в localStorage
        localStorage.setItem('user', JSON.stringify(formData));

        // Переходим на страницу problems
        navigate("/ListTasks"); // Используем navigate вместо history.push
    };

    ////////////////

    const tabsRef = useRef([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0); // Устанавливаем начальный индекс на 0
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

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
                    //backgroundColor: isActive ? "#007bff" : "transparent",
                    }}
                    onClick={() => setActiveTabIndex(index)}
                >
                    {tab.name}
                </button>
                );
            })}
        </div>
        <div className="container" style={{marginTop: 15}}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit"
                sx ={{color:'#ffffff', backgroundColor:'#007bff', marginTop: 3,"&:hover": {backgroundColor: "#1976d2"}}}
                >Register
                </Button>
            </form>
        </div>
        </div>
    );
};

const styles = {
    tabBar: {
      display: "flex",
      position: "relative",
      height: "48px",
      borderRadius: "24px",
      border: "1px solid rgba(0, 0, 0, 0.4)",
      backgroundColor: "#2d2d2d",
      //padding: "0 8px",
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
