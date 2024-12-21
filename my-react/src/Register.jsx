import { useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


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
                <Button type="submit"
                sx ={{color:'#ffffff', backgroundColor:'#007bff', marginTop: 3,"&:hover": {backgroundColor: "#1976d2"}}}
                >Register
                </Button>
            </form>
        </div>
    );
};

export default Register;
