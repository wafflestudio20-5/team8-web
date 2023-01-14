import Header from "./Header";
import Body from "./Body";
import Search from "./Search";
import Interest from "./Interest";
import Cart from "./Cart";
import Register from "./Register";
import Registered from "./Registered";
import Mypage from "./Mypage";
import TimeTable from "./TimeTable";
import Enroll from "./Enroll";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Header />
        </header>
        <div className="padding"></div>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/interest" element={<Interest />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to={""} />} />
        </Routes>
        <ToastContainer
          position="top-right"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
