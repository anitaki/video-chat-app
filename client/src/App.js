import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout"
import ChatRoom from "./pages/ChatRoom";
import Test from "./pages/Test"
import Rooms from "./components/Rooms";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/test" element={<Test />} />


          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
