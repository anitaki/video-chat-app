import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/chat" element={<ChatRoom />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;