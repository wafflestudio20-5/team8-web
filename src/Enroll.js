import "./Enroll.css";
import { useUserDataContext, useCourseDataContext } from "./Context";
import { useStateDataContext } from "./StateContext";
import React, { useCallback, useState, useEffect } from "react";
import Course from "./Course";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Enroll = () => {
  let navigate = useNavigate();
  const { cookies } = useUserDataContext();
  const {
    addEnroll,
    count,
    enroll_courses,
    getEnroll,
    interest_courses,
    getInterests,
    setGetting,
    courses,
    setSearch_word,
    registered_courses,
  } = useCourseDataContext();

  const [checkedInputs, setCheckedInputs] = useState("");
  const [clicked, setClicked] = useState("cart");
  const [state, setState] = useState(0);

  const fetchState = async () => {
    await axios
      .get(`https://snu-sugang.o-r.kr/state/`)
      .then((res) => {
        console.log(res);
        console.log(res.data.period);

        return res.data.period;
      })
      .then((state) => {
        if (state !== 3) {
          console.log(state);
          navigate("/");
          toast.error("수강신청 기간이 아닙니다");
        }
        if (clicked === "cart") getEnroll();
        if (clicked === "interest") getInterests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <div>
      <div id="wrap">
        <div className="list-body">
          <div className="list-area">
            <div className="enroll-first">
              <div className="title">수강신청</div>
              <div className="button">
                <button
                  className={clicked === "cart" ? "clicked" : ""}
                  onClick={() => setClicked("cart")}
                >
                  장바구니 보류강좌
                </button>
                <button
                  className={clicked === "interest" ? "clicked" : ""}
                  onClick={() => setClicked("interest")}
                >
                  관심강좌
                </button>
                <button
                  className={clicked === "search" ? "clicked" : ""}
                  onClick={() => setClicked("search")}
                >
                  교과목검색
                </button>
              </div>
              <span className="content">
                <span>
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
                    신청강좌&nbsp;<span>{registered_courses.length}</span>강좌
                  </span>
                </span>
                {clicked === "search" ? (
                  <span>
                    <input
                      type="text"
                      onKeyDown={(e) => setSearch_word(e.target.value)}
                      onChange={(e) => {
                        setSearch_word(e.target.value);
                      }}
                    />
                    <button
                      className="searchButton"
                      onClick={() => setGetting(true)}
                    >
                      검색
                    </button>
                  </span>
                ) : (
                  <div></div>
                )}
              </span>
            </div>
            <div>
              {clicked === "cart" ? (
                enroll_courses.map((course) => (
                  <div className="item">
                    <Course
                      course={course}
                      key={course.id}
                      checkedInputs={checkedInputs}
                      setCheckedInputs={setCheckedInputs}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
              {clicked === "interest" ? (
                interest_courses.map((course) => (
                  <div className="item">
                    <Course
                      course={course}
                      key={course.id}
                      checkedInputs={checkedInputs}
                      setCheckedInputs={setCheckedInputs}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
              {clicked === "search" ? (
                courses.map((course) => (
                  <div className="item">
                    <Course
                      course={course}
                      key={course.id}
                      checkedInputs={checkedInputs}
                      setCheckedInputs={setCheckedInputs}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
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
    </div>
  );
};

export default Enroll;
