import "./Header.css";
import GoogleButton from "./GoogleButton";
import { useUserDataContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

const Header = () => {
  const menu = [
    { title: "관심강좌", link: "/interest" },
    { title: "시간표", link: "/timetable" },
    { title: "장바구니", link: "/cart" },
    { title: "수강신청", link: "/register" },
    { title: "수강신청내역", link: "/registered" },
  ];

  const { loginState, setLoginState, cookie, name, studentId } =
    useUserDataContext();

  let navigate = useNavigate();
  const logout = () => {
    setLoginState(false);
    navigate("/");
    toast.success("로그아웃되었습니다.");
  };

  return (
    <div className="headerbox">
      <div className="headerup">
        <div>
          <a href="/">
            <img src={"/img_logo_main.png"} alt={"logo"} className="logo" />
            <span className="logoname">2022-겨울학기</span>
          </a>
          <div className="searchbar">
            <select>
              <option>Search</option>
            </select>
            <input
              type="text"
              placeholder="전체 강좌 검색은 돋보기 버튼을 클릭하세요"
            />
            <div>
              <img src={"/search.png"} alt={"search"} className="searchicon" />
            </div>
            <div className="search_list">
              <img
                src={"/search_list.png"}
                alt={"searchlist"}
                className="listicon"
              />
            </div>
          </div>
        </div>
        <GoogleButton />
        {loginState ? (
          <div className="accountinfo">
            <div>{name}</div>
            <div>학번 {studentId}</div>
          </div>
        ) : (
          <GoogleButton />
        )}
      </div>
      <div className="headerdown">
        <div>
          {menu.map((item) => (
            <div key={item.title}>
              <a href={item.link}>{item.title}</a>
            </div>
          ))}
        </div>
        {loginState && (
          <div className="mypage">
            <a href={"/mypage"}> 마이페이지</a>
            &nbsp;
            <a href={"/"} onClick={logout}>
              로그아웃
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
