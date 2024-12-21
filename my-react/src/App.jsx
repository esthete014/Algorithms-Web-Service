import { useState } from 'react';
import Register from "./Register"; 
import Problems from './Problems'; 
import ListTasks from './ListTasks'; 
import AccountButton from "./AccountButton"; 
import Account from './Account'; 
import './styles.css'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 

const App = () => {
    const [avatarSrc, setAvatarSrc] = useState('');

    // Обёртка для кнопки личного кабинета
    const AccountButtonWrapper = () => {
        const location = useLocation(); 

        // Отображаем кнопку только на определённых страницах
        if (location.pathname === '/problems' || location.pathname === '/ListTasks') {
            return <AccountButton avatarSrc={avatarSrc} />; // Показываем только на странице задач
        }
        return null;
    };

    return (
        <Router>
            <AccountButtonWrapper /> {/* Обёртка для условного отображения кнопки */}
            <Routes>
                <Route path="/" element={<Register />} /> 
                <Route path="/problems" element={<Problems />} />
                <Route path="/ListTasks" element={<ListTasks />} />
                <Route path="/account" element={<Account setAvatarSrc={setAvatarSrc} />} />
            </Routes>
        </Router>
    );
};

export default App; 
