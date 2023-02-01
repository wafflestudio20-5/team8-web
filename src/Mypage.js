import "./Mypage.css";
import { useCourseDataContext, useUserDataContext } from "./Context";
import React, { useContext, useState } from "react";

const Mypage = () => {
  const {
    name,
    email,
    password,
    college,
    department,
    studentId,
    yearOfEntrance,
    program,
    grade,
  } = useUserDataContext();

  return (
    <div className="register-container">
      <div className="register-title">마이페이지</div>
      <div className="register-contents">
        <form className="form">
          <span className="bold-title">이름 </span>
          <span className="mypage-content">{name}</span>
          <br />
          <span className="bold-title">이메일</span>
          {email}
          <br />
          <span className="bold-title">소속 대학</span>
          <span className="mypage-content">{college}</span>
          <span className="bold-title">소속 학과</span>
          {department}
          <br />
          <span className="bold-title">학번</span>
          <span className="mypage-content">{studentId}</span>
          <span className="bold-title">입학년도</span>
          {yearOfEntrance}
          <br />
          <span className="bold-title">이수 과정</span>
          <span className="mypage-content">{program}</span>
          <span className="bold-title">학년</span>
          {grade}
        </form>
      </div>
    </div>
  );
};

export default Mypage;
