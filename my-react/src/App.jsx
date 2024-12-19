import { useState } from 'react';
import Register from "./Register";
import Problems from './Problems';
import ListTasks from './ListTasks';
import AccountButton from "./AccountButton";
import Account from './Account';
import './styles.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Импортируем Routes вместо Switch

const App = () => {
    const [avatarSrc, setAvatarSrc] = useState('');
    const AccountButtonWrapper = () => {
        const location = useLocation();
    
        // Показываем кнопку только на странице `/problems`
        if (location.pathname === '/problems' || location.pathname === '/ListTasks') {
          return <AccountButton avatarSrc={avatarSrc} />;
        }
        return null;
    };
    return (
        <Router>
             <AccountButtonWrapper />
            <Routes>
                <Route path="/" element={<Register />} /> {/* Используем element вместо component */}
                <Route path="/problems" element={<Problems />} />
                <Route path="/ListTasks" element={<ListTasks />} />
                <Route path="/account" element={<Account setAvatarSrc={setAvatarSrc} />}/>
            </Routes>
        </Router>
    );
};

export default App;
