import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import ChatRoom from './pages/ChatRoom';
import Rooms from "./components/Rooms";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/test" element={<Rooms />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;