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
import Bottom from "./Bottom";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useState } from "react";
import { useClassDataContext } from "./Context";

function App() {
  const [searchopen, setSearchopen] = useState(false);
  const { modal } = useClassDataContext();

  return (
    <div>
      <HashRouter>
        <Header searchopen={searchopen} setSearchopen={setSearchopen} />
        <div className="padding"></div>
        <Searchcourse searchopen={searchopen} setSearchopen={setSearchopen} />
        {modal && <Coursedetail />}
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
          <Route path="/review/:courseid/" element={<Review />} />
          <Route path="/newreview/:courseid/" element={<Newreview />} />
          <Route
            path="/reviewcontent/:courseid/:reviewid/"
            element={<Reviewcontent />}
          />
          <Route path="*" element={<Navigate to={""} />} />
        </Routes>
        <ToastContainer
          position="top-right"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Bottom />
      </HashRouter>
    </div>
  );
}

export default App;
