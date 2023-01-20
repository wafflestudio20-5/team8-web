import "./TimeTable.css";
import { useCourseDataContext, useUserDataContext } from "./Context";
import React, { useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

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

const randomRgb = function () {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return [r, g, b];
};

const randomRgbHex = () => {
  let [r, g, b] = randomRgb();
  r = r.toString(16).length === 1 ? "0" + r.toString(16) : (r - 1).toString(16);
  g = g.toString(16).length === 1 ? "0" + g.toString(16) : (g - 1).toString(16);
  b = b.toString(16).length === 1 ? "0" + b.toString(16) : (b - 1).toString(16);
  console.log(r + g + b);
  return "#" + String(r + g + b);
};

const changeDayToNum = (day) => {
  let dayNum;
  if (day === "MON") dayNum = 2;
  else if (day === "TUE") dayNum = 3;
  else if (day === "WED") dayNum = 4;
  else if (day === "THU") dayNum = 5;
  else if (day === "FRI") dayNum = 6;
  else dayNum = 7;
  return dayNum;
};

const changeTimeToNum = (time) => {
  let arr = time.split(":");
  let num = parseInt(arr[0]) - 6;
  let minute = parseInt(arr[1]);
  if (minute >= 45) num += 2;
  else if (minute >= 15) num += 1;
  return num;
};

const TimeTable = () => {
  const { cookies } = useUserDataContext();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   allCells();
  //   console.log("allcells");
  // }, []);

  function CourseTable(props) {
    console.log("시작");
    console.log(props);
    console.log(props.arr);

    let cellArr = [];
    let parsedTime = [];
    let dayNum = 2,
      startTime = 2,
      endTime = 3,
      count = 0;
    for (let i = 0; i < props.arr.length; i++) {
      parsedTime = props.arr[i].parsed_time;
      let color = randomRgbHex();
      for (let j = 0; j < parsedTime.length; j++) {
        count++;
        dayNum = changeDayToNum(parsedTime[j].day);
        startTime = changeTimeToNum(parsedTime[j].start_time);
        endTime = changeTimeToNum(parsedTime[j].end_time);
        console.log("수업");
        console.log(dayNum);
        console.log(startTime);
        console.log(endTime);

        cellArr.push(
          <StyledCell
            columnStart={String(dayNum)}
            columnEnd={String(dayNum + 1)}
            rowStart={String(startTime)}
            rowEnd={String(endTime)}
            opacity="1"
            backgroundColor={color}
            key={count}
          >
            {props.arr[i].name}
          </StyledCell>
        );
      }
    }
    setShow(true);
    return cellArr;
  }

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

  const allCells = () => {
    let cellArr = [];
    cellArr.push(
      <StyledCell
        columnStart="3"
        columnEnd="4"
        rowStart="6"
        rowEnd="8"
        opacity="1"
        backgroundColor={randomRgbHex}
        key="0"
      >
        심리학개론
      </StyledCell>
    );
    let arr = [];
    let parsedTime = [];
    let dayNum = 2,
      startTime = 2,
      endTime = 3,
      count = 0;
    axios
      .get("https://snu-sugang.o-r.kr/cart/", {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      })
      .then((response) => {
        console.log(response);
        arr = response.data.results;
      })
      .then((response) => {
        for (let i = 0; i < arr.length; i++) {
          parsedTime = arr[i].parsed_time;
          let color = randomRgbHex();
          for (let j = 0; j < parsedTime.length; j++) {
            count++;
            dayNum = changeDayToNum(parsedTime[j].day);
            startTime = changeTimeToNum(parsedTime[j].start_time);
            endTime = changeTimeToNum(parsedTime[j].end_time);
            console.log("수업");
            console.log(dayNum);
            console.log(startTime);
            console.log(endTime);

            cellArr.push(
              <StyledCell
                columnStart={String(dayNum)}
                columnEnd={String(dayNum + 1)}
                rowStart={String(startTime)}
                rowEnd={String(endTime)}
                opacity="1"
                backgroundColor={color}
                key={count}
              >
                {arr[i].name}
              </StyledCell>
            );
          }
        }
        console.log(cellArr);
        setShow(true);
        return cellArr;
      })
      .catch(() => {
        console.log(cellArr);
        toast.error("오류가 발생했습니다.");
        return cellArr;
      });
  };
  // const allCells = () => {
  //   const cellArr = [];
  //   axios.get("https://snu-sugang.o-r.kr/cart/").then((response) => {
  //     console.log(response);
  //     let dayNum = 2,
  //       startTime = 2,
  //       endTime = 3;
  //     for (let i = 0; i < 2; i++) {
  //       let day = "",
  //         startTime1 = "",
  //         endTime1 = "";
  //       dayNum = changeDayToNum(day);
  //     }
  //     cellArr.push(
  //       <StyledCell
  //         columnStart="3"
  //         columnEnd="4"
  //         rowStart="6"
  //         rowEnd="8"
  //         opacity="1"
  //         backgroundColor={randomRgbHex}
  //         cell="true"
  //       >
  //         심리학개론
  //       </StyledCell>
  //     );
  //   });
  //   return cellArr;
  // };

  return (
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
        {/*{show && <CourseTable arr={allCells()} />}*/}
        {allCells()}
        {columnLines()}
      </div>
    </div>
  );
};

export default TimeTable;
