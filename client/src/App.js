import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/chat" element={<ChatRoom />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;