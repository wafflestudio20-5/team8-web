import logo from "./logo.svg";
import Header from "./Header";
import Interest from "./Interest";
import Cart from "./Cart";
import Register from "./Register";
import Registered from "./Registered";
import Mypage from "./Mypage";
import TimeTable from "./TimeTable";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";

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
    </BrowserRouter>
  );
}

export default App;
