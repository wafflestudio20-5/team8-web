import "./Enroll.css";
import { useUserDataContext } from "./Context";
import React, { useContext, useState } from "react";
import Course from "./Course";

const Enroll = () => {
  const { cookies } = useUserDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");
  const [enroll_courses, setEnroll_courses] = useState([]);
  const [count, setCount] = useState(0);

  return (
    <div>
      <div id="wrap">
        <div className="list-body">
          <div className="list-area">
            <div className="enroll-first">
              <div className="title">수강신청</div>
              <div className="button">
                <button>장바구니 보류강좌</button>
                <button>관심강좌</button>
                <button>교과목검색</button>
              </div>
              <span className="content">
                <span>
                  신청가능학점&nbsp; <span>{}</span>학점/
                </span>
                <span>
                  신청학점&nbsp;<span>{}</span>학점/
                </span>
                <span>
                  신청강좌&nbsp;<span>{}</span>강좌
                </span>
              </span>
            </div>

            {enroll_courses.map((course) => (
              <div className="item">
                <Course
                  course={course}
                  key={course.id}
                  checkedInputs={checkedInputs}
                  setCheckedInputs={setCheckedInputs}
                />
              </div>
            ))}
            <div className="line">
              총 <div className="num">{count}</div>건
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <a href="https://www.snu.ac.kr/personal_information">
          개인정보취급방침
        </a>{" "}
        &nbsp;|&nbsp;
        <a href="https://www.snu.ac.kr/prohibition_of_unauthorized_email_collection">
          이메일무단수집거부
        </a>
        <br />
        <span className="darkgray-word">
          Copyright (C) 2020 SEOUL NATIONAL UNIVERSITY. All Rights Reserved.
        </span>
      </div>
      <div className="nav">
        <div className="nav-bottom">
          <div className="nav-code">00</div>
          <input className="nav-code-input" placeholder="입력"></input>
        </div>
        <button className="enroll-button"> 수강신청</button>
      </div>
    </div>
  );
};

export default Enroll;
