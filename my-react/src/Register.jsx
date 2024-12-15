import { useState } from "react";
import './styles.css'; // Импортируем CSS стили
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });


    
    const navigate = useNavigate(); // Инициализируем useNavigate

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
        navigate("/problems"); // Используем navigate вместо history.push
    };

    return (
        <div className="container">
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
