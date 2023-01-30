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
import Coursedetail from "./Coursedetail";
import Searchcourse from "./Searchcourse";
import Review from "./Review";
import Newreview from "./Newreview";
import Reviewcontent from "./Reviewcontent";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [modal, setModal] = useState(true);
  const [searchopen, setSearchopen] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <header>
          <Header searchopen={searchopen} setSearchopen={setSearchopen} />
        </header>
        <div className="padding"></div>
        <Searchcourse searchopen={searchopen} setSearchopen={setSearchopen} />
        {modal && <Coursedetail modal={modal} setModal={setModal} />}
        <Routes>
          <Route path="/" element={<Body />}></Route>
          <Route path="/interest" element={<Interest />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/registered" element={<Registered />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/timetable" element={<TimeTable />}></Route>
          <Route path="/enroll" element={<Enroll />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/newreview" element={<Newreview />}></Route>
          <Route path="/reviewcontent" element={<Reviewcontent />}></Route>
          <Route path="*" element={<Navigate to={""} />}></Route>
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
