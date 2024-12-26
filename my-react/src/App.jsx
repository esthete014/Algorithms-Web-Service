import { useState } from "react";
import Register from "./Register";
import Problems from "./Problems";
import ListTasks from "./ListTasks";
import AddTasks from "./AddTasks";
//import AccountButton from "./AccountButton";
import Account from "./Account";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [setAvatarSrc] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/ListTasks" element={<ListTasks />} />
        <Route path="/AddTasks" element={<AddTasks />} />
        <Route
          path="/account"
          element={<Account setAvatarSrc={setAvatarSrc} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
