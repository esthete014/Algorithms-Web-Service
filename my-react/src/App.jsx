//import React from 'react';
import Register from "./Register";
import Problems from './Problems'; // Импортируем компонент Problems
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Импортируем Routes вместо Switch

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} /> {/* Используем element вместо component */}
                <Route path="/problems" element={<Problems />} />
            </Routes>
        </Router>
    );
};

export default App;
