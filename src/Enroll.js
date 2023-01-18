import "./Enroll.css";
import { useUserDataContext, useCourseDataContext } from "./Context";
import React, { useContext, useState, useEffect } from "react";
import Course from "./Course";

const Enroll = () => {
  const { cookies } = useUserDataContext();
  const { addEnroll, count, enroll_courses, getEnroll } =
    useCourseDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");

  useEffect(() => {
    getEnroll();
  }, [getEnroll]);

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
                  신청가능학점&nbsp; <span>21</span>학점/
                </span>
                <span>
                  신청학점&nbsp;
                  <span>
                    {enroll_courses
                      .map(function (x) {
                        return x.credit;
                      })
                      .reduce(function (a, b) {
                        return a + b;
                      }, 0)}
                  </span>
                  학점/
                </span>
                <span>
                  신청강좌&nbsp;<span>{count}</span>강좌
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
        <button
          className="enroll-button"
          onClick={() => addEnroll(checkedInputs)}
        >
          {" "}
          수강신청
        </button>
      </div>
    </div>
  );
};

export default Enroll;
