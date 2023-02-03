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

    addTT,
  } = useCourseDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");
  const navigate = useNavigate();

  const [secNum, setSecNum] = useState("");
  const [ran1, setRan1] = useState(0);
  const [ran2, setRan2] = useState(0);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setRan1(Math.floor(Math.random() * 10));
    setRan2(Math.floor(Math.random() * 10));
  }, [update]);

  const checkSec = () => {
    let realNum = 10 * ran1 + ran2;
    if (parseInt(secNum) === realNum) return true;
    else return false;
  };

  useEffect(() => {
    getInterests();
  }, []);

  return (
    <div>
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
      </div>
      <div className="interest-nav">
        <button className="cart-button" onClick={() => addCart(checkedInputs)}>
          {" "}
          장바구니 담기
        </button>
        <button className="tt-button" onClick={() => addTT(checkedInputs)}>
          {" "}
          시간표에 추가
        </button>
        <div className="tt-buttons">
          <button
            className="tt-button-num"
            onClick={() => addTT(checkedInputs, 3)}
          >
            {" "}
            1
          </button>
          <button
            className="tt-button-num"
            onClick={() => addTT(checkedInputs, 4)}
          >
            {" "}
            2
          </button>
          <button
            className="tt-button-num"
            onClick={() => addTT(checkedInputs, 5)}
          >
            {" "}
            3
          </button>
        </div>

        <div className="nav-bottom">
          <div className="nav-code">
            {ran1}
            {ran2}
          </div>
          <input
            className="nav-code-input"
            placeholder="입력"
            onChange={(e) => {
              setSecNum(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="enroll-button"
          onClick={() => {
            setUpdate(!update);
            if (checkedInputs === "") toast.error("강좌를 선택해주세요.");
            else {
              if (checkSec()) addEnroll(checkedInputs);
              else toast.error("보안문자가 잘못되었습니다.");
            }
          }}
        >
          {" "}
          수강신청
        </button>
      </div>
    </div>
  );
};

export default Interest;
