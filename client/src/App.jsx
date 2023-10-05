import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useContext, useEffect } from "react"
import AuthContext from "./context/AuthContext"
import { Toaster } from "react-hot-toast"
function App() {
  const { getUser } = useContext(AuthContext);
  useEffect(() => {
    getUser();
  }
    , [])


  return (
    <Router>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
