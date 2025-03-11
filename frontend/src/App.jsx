import "./App.css"; 
import Home from "./components/Home";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import About from "./components/About";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Faculty from "./components/Faculty";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudenLogin from "./components/StudentLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
          <Route path="/contactus" element={<PublicRoute><Contact /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          {/* Private Routes */}
          <Route path="/faculty/*" element={<PrivateRoute><Faculty /></PrivateRoute>} />
          <Route path="/student" element={<PrivateRoute><StudenLogin /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
