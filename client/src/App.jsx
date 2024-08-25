import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage.jsx";
import Navbar from "./components/navbar.jsx";
import Companies from "./pages/Companies.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </BrowserRouter>
  );
}
