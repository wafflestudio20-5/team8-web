import "./Register.css";
import { useUserDataContext } from "./Context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const {
    name,
    email,
    password,
    college,
    setCollege,
    department,
    setDepartment,
    studentId,
    setStudentId,
    yearOfEntrance,
    setYearOfEntrance,
  } = useUserDataContext();
  // 학번, 이름, 이수과정, 학년, 입학년도, 등록횟수, 주전공, 부전공, 복수전공

  useEffect(() => {
    if (studentId.length > 3) setYearOfEntrance(studentId.substring(0, 4));
  }, [studentId]);

  let navigate = useNavigate();

  const signup = () => {
    axios
      .post("https://snu-sugang.o-r.kr/user/register/", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("sign-up success");
        console.log(response);
        navigate(-1);
      })
      .catch((response) => {
        console.log("sign-up failed");
        alert("sign-up failed");
        navigate(-1);
      });
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-title">회원가입</div>
        <div className="register-contents">
          <form className="form">
            <span className="bold-title">이름 </span>
            <span className="register-content">{name}</span>
            <br />
            <span className="bold-title">이메일</span>
            {email}
            <br />
            <span className="bold-title">소속 대학</span>
            <input
              className="register-input"
              placeholder="공과대학"
              onChange={(e) => setCollege(e.target.value)}
            />
            <span className="bold-title">소속 학과</span>
            <input
              className="register-input"
              placeholder="컴퓨터공학과"
              onChange={(e) => setDepartment(e.target.value)}
            />
            <br />
            <span className="bold-title">학번</span>
            <input
              className="register-input"
              placeholder="2022-12345"
              onChange={(e) => setStudentId(e.target.value)}
            />
            <span className="bold-title">입학년도</span>
            <input
              className="register-input"
              value={yearOfEntrance}
              placeholder="2022"
              onChange={(e) => setYearOfEntrance(e.target.value)}
            />
            <br />
            <span className="bold-title">이수 과정</span>
            주전공? 부전공? 복수전공 넣을까요? 학과랑 겹치는 것 같아서요!
          </form>
        </div>
      </div>
      <div>
        <button onClick={signup}>가입</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default Register;
