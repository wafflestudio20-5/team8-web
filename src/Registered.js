import "./Registered.css";
import { useUserDataContext, useCourseDataContext } from "./Context";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import axios from "axios";
import styled from "styled-components";

const TimeCell = styled.div`
  grid-column-start: ${(props) => props.columnStart || "1"};
  grid-column-end: ${(props) => props.columnEnd || "2"};
  grid-row-start: ${(props) => props.rowStart || "1"};
  grid-row-end: ${(props) => props.rowEnd || "2"};
  display: block;
  text-align: center;
  padding-left: 8px;
`;
const StyledCell = styled.div`
  grid-column-start: ${(props) => props.columnStart || "1"};
  grid-column-end: ${(props) => props.columnEnd || "2"};
  grid-row-start: ${(props) => props.rowStart || "1"};
  grid-row-end: ${(props) => props.rowEnd || "2"};
  color: black;
  background-color: ${(props) => props.backgroundColor || "yellow"};
  display: grid;
  align-items: center;
  text-align: center;
  opacity: 1;
  padding-left: 10px;
  padding-right: 10px;
`;
const Rows = styled.div`
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: ${(props) => props.rowStart || "1"};
  grid-row-end: ${(props) => props.rowEnd || "2"};
  border-bottom: ${(props) => props.border || "0.5px solid #dedede"};
`;
const Columns = styled.div`
  grid-row-start: 2;
  grid-row-end: 32;
  grid-column-start: ${(props) => props.columnStart || "3"};
  grid-column-end: ${(props) => props.columnEnd || "4"};
  background-color: #ededed;
  opacity: ${(props) => props.opacity || "0.2"}; /* 80% 불투명도 */
`;

const Registered = () => {
  const time = () => {
    const timeArr = [];
    for (let i = 0; i < 15; i++) {
      timeArr.push(
        <TimeCell rowStart={2 * i + 2} rowEnd={2 * i + 3}>
          {8 + i}
        </TimeCell>
      );
    }
    return timeArr;
  };

  const rowLines = () => {
    const timeArr = [];
    for (let i = 2; i <= 30; i++) {
      if (i % 2 == 0) timeArr.push(<Rows rowStart={i} rowEnd={i + 1} />);
      else
        timeArr.push(
          <Rows rowStart={i} rowEnd={i + 1} border="1px solid #dedede" />
        );
    }
    return timeArr;
  };

  const columnLines = () => {
    const timeArr = [];
    for (let i = 1; i <= 3; i++) {
      timeArr.push(<Columns columnStart={2 * i + 1} columnEnd={2 * i + 2} />);
    }
    return timeArr;
  };

  const randomRgb = function () {
    let r = Math.floor(Math.random() * 127 + 128);
    let g = Math.floor(Math.random() * 127 + 128);
    let b = Math.floor(Math.random() * 127 + 128);
    return [r, g, b];
  };

  const randomRgbHex = () => {
    let [r, g, b] = randomRgb();
    r =
      r.toString(16).length === 1 ? "0" + r.toString(16) : (r - 1).toString(16);
    g =
      g.toString(16).length === 1 ? "0" + g.toString(16) : (g - 1).toString(16);
    b =
      b.toString(16).length === 1 ? "0" + b.toString(16) : (b - 1).toString(16);
    console.log(r + g + b);
    return "#" + String(r + g + b);
  };

  const changeDayToNum = (day) => {
    let dayNum = 2;
    if (day == "MON") dayNum = 2;
    else if (day == "TUE") dayNum = 3;
    else if (day == "WED") dayNum = 4;
    else if (day == "THU") dayNum = 5;
    else if (day == "FRI") dayNum = 6;
    else dayNum = 7;
    return dayNum;
  };

  const changeTimeToNum = (time) => {
    let arr = time.split(":");
    let num = (parseInt(arr[0]) - 8) * 2 + 2;
    let minute = parseInt(arr[1]);
    if (minute >= 45) num += 2;
    else if (minute >= 30) num += 1;
    return num;
  };

  const { cookies } = useUserDataContext();
  const { delRegistered, getRegistered, registered_courses, count } =
    useCourseDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getRegistered();
  }, []);

  const allCells = () => {
    const cellArr = [];
    let parsedTime = [];
    let dayNum = 2,
      startTime = 2,
      endTime = 3,
      courseCount = 0;
    console.log(registered_courses);
    for (let i = 0; i < registered_courses.length; i++) {
      parsedTime = registered_courses[i].parsed_time;
      let color = randomRgbHex();
      for (let j = 0; j < parsedTime.length; j++) {
        courseCount++;
        dayNum = changeDayToNum(parsedTime[j].day);
        startTime = changeTimeToNum(parsedTime[j].start_time);
        endTime = changeTimeToNum(parsedTime[j].end_time);
        cellArr.push(
          <StyledCell
            columnStart={dayNum}
            columnEnd={dayNum + 1}
            rowStart={startTime}
            rowEnd={endTime}
            opacity="1"
            backgroundColor={color}
            key={courseCount}
            cell="true"
          >
            {registered_courses[i].name}
          </StyledCell>
        );
      }
    }
    return cellArr;
  };

  return (
    <div>
      <div className="Registered">
        <div className="Registered-body">
          <div className="Registered-list">
            <div className="Registered-first">
              <div className="title">수강신청내역</div>
            </div>
            <div className="header">
              <span className="explain">
                <div>
                  ※ 신입생은 신입생세미나 등 일부 교과목 신청가능학점 초과
                  수강신청가능
                </div>
                <div className="content">
                  <div className="button">
                    <button onClick={() => delRegistered(checkedInputs)}>
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

          <div className="time-table-container">
            <h3>수강신청 시간표</h3>
            <div className="table-container">
              <div className="table-header"></div>
              <div className="table-header">월</div>
              <div className="table-header">화</div>
              <div className="table-header">수</div>
              <div className="table-header">목</div>
              <div className="table-header">금</div>
              <div className="table-header">토</div>
              {time()}
              {rowLines()}
              {allCells()}
              {columnLines()}
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
    </div>
  );
};

export default Registered;
