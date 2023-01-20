import "./Interest.css";
import { useUserDataContext, useCourseDataContext } from "./Context";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Course from "./Course";
import axios from "axios";
import { toast } from "react-toastify";

const Interest = () => {
  const {
    delInterest,
    addEnroll,
    addCart,
    getInterests,
    interest_courses,
    count,
  } = useCourseDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getInterests();
  }, [getInterests]);

  return (
      <div id="wrap">
        <div className="list-body">
          <div className="list-area">
            <div className="first">
              <div className="title">관심강좌</div>
              <div className="body">
                <span>
                  <button onClick={() => delInterest(checkedInputs)}>
                    &nbsp;&nbsp;선택삭제&nbsp;&nbsp;
                  </button>
                  <button onClick={() => navigate("/timetable/")}>
                    &nbsp;&nbsp;시간표 보기&nbsp;&nbsp;
                  </button>
                </span>
                <span className="content">
                  <span>
                    총 학점{" "}
                    <span>
                      {interest_courses
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
                    총 강좌 <span>{count}</span>건
                  </span>
                </span>
              </div>
            </div>

            {interest_courses.map((course) => (
              <div className="item">
                <Course
                  course={course}
                  key={course.id}
                  checkedInputs={checkedInputs}
                  setCheckedInputs={setCheckedInputs}
                />
              </div>
            ))}
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
      <div className="interest-nav">
        <button className="cart-button" onClick={() => addCart(checkedInputs)}>
          {" "}
          장바구니 담기
        </button>

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

export default Interest;
