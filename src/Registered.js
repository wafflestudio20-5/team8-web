import "./Registered.css";
import { useUserDataContext, useCourseDataContext } from "./Context";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import axios from "axios";

const Registered = () => {
  const { cookies } = useUserDataContext();
  const { delEnroll } = useCourseDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");
  const [registered_courses, setRegistered_courses] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    function getInterests() {
      axios
        .get(`https://snu-sugang.o-r.kr/registered/`, {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(res);
          setRegistered_courses(res.data.results);
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
      <div className="Registered">
        <div className="Registered-first">
          <div className="title">수강신청내역</div>
        </div>
        <div className="Registered-body">
          <div className="Registered-list">
            <div className="header">
              <span className="explain">
                <div>
                  ※ 신입생은 신입생세미나 등 일부 교과목 신청가능학점 초과
                  수강신청가능
                </div>
                <div className="content">
                  <div className="button">
                    <button onClick={() => delEnroll(checkedInputs)}>
                      선택삭제
                    </button>
                    <button onClick={() => navigate(`/interest/`)}>
                      관심강좌
                    </button>
                  </div>
                  <span>
                    <span>
                      신청가능학점&nbsp; <span>21</span>학점/
                    </span>
                    <span>
                      신청학점&nbsp;
                      <span>
                        {registered_courses
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
              </span>
            </div>
            {registered_courses.map((course) => (
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

          <div className="Registered-timetable"></div>
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
    </div>
  );
};

export default Registered;
