import "./Interest.css";
import { useUserDataContext } from "./Context";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import axios from "axios";

const Interest = () => {
  const { cookies } = useUserDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");
  const [interest_courses, setInterest_courses] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    function getInterests() {
      axios
        .get(`https://snu-sugang.o-r.kr/interest/`, {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(res);
          setInterest_courses(res.data.results);
          setCount(res.data.count);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                  <button>&nbsp;&nbsp;선택삭제&nbsp;&nbsp;</button>
                  <button>&nbsp;&nbsp;시간표 보기&nbsp;&nbsp;</button>
                </span>
                <span className="content">
                  <span>
                    총 학점 <span>{}</span>학점/
                  </span>
                  <span>
                    총 강좌 <span>{}</span>건
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
        <button className="cart-button"> 장바구니 담기</button>

        <div className="nav-bottom">
          <div className="nav-code">00</div>
          <input className="nav-code-input" placeholder="입력"></input>
        </div>
        <button className="enroll-button"> 수강신청</button>
      </div>
    </div>
  );
};

export default Interest;
