import Header from "./Header";
import Interest from "./Interest";
import Cart from "./Cart";
import Register from "./Register";
import Registered from "./Registered";
import Mypage from "./Mypage";
import TimeTable from "./TimeTable";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Search from "./Search";
function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/interest" element={<Interest />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registered" element={<Registered />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="*" element={<Navigate to={""} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
