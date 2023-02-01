import './Cart.css'
import { useUserDataContext, useCourseDataContext } from './Context'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const TimeCell = styled.div`
  grid-column-start: ${(props) => props.columnStart || '1'};
  grid-column-end: ${(props) => props.columnEnd || '2'};
  grid-row-start: ${(props) => props.rowStart || '1'};
  grid-row-end: ${(props) => props.rowEnd || '2'};
  display: block;
  text-align: center;
  padding-left: 8px;
`
const StyledCell = styled.div`
  grid-column-start: ${(props) => props.columnStart || '1'};
  grid-column-end: ${(props) => props.columnEnd || '2'};
  grid-row-start: ${(props) => props.rowStart || '1'};
  grid-row-end: ${(props) => props.rowEnd || '2'};
  color: black;
  background-color: ${(props) => props.backgroundColor || 'yellow'};
  display: grid;
  align-items: center;
  text-align: center;
  opacity: 1;
  padding-left: 5px;
  padding-right: 5px;
`;
const Rows = styled.div`
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: ${(props) => props.rowStart || '1'};
  grid-row-end: ${(props) => props.rowEnd || '2'};
  border-bottom: ${(props) => props.border || '0.5px solid #dedede'};
`
const Columns = styled.div`
  grid-row-start: 2;
  grid-row-end: 32;
  grid-column-start: ${(props) => props.columnStart || '3'};
  grid-column-end: ${(props) => props.columnEnd || '4'};
  background-color: #ededed;
  opacity: ${(props) => props.opacity || '0.2'}; /* 80% 불투명도 */
`

const Cart = () => {
  const time = () => {
    const timeArr = []

    for (let i = 0; i < 15; i++) {
      timeArr.push(
        <TimeCell rowStart={2 * i + 2} rowEnd={2 * i + 3}>
          {8 + i}
        </TimeCell>,
      )
    }
    return timeArr
  }

  const rowLines = () => {
    const timeArr = []
    for (let i = 2; i <= 30; i++) {
      if (i % 2 == 0) timeArr.push(<Rows rowStart={i} rowEnd={i + 1} />)
      else
        timeArr.push(
          <Rows rowStart={i} rowEnd={i + 1} border="1px solid #dedede" />,
        )
    }
    return timeArr
  }

  const columnLines = () => {
    const timeArr = []
    for (let i = 1; i <= 3; i++) {
      timeArr.push(<Columns columnStart={2 * i + 1} columnEnd={2 * i + 2} />)
    }
    return timeArr
  }

  // const randomRgb = function () {
  //   let r = Math.floor(Math.random() * 127 + 128);
  //   let g = Math.floor(Math.random() * 127 + 128);
  //   let b = Math.floor(Math.random() * 127 + 128);
  //   return [r, g, b];
  // };
  //
  // const randomRgbHex = () => {
  //   let [r, g, b] = randomRgb();
  //   r =
  //     r.toString(16).length === 1 ? "0" + r.toString(16) : (r - 1).toString(16);
  //   g =
  //     g.toString(16).length === 1 ? "0" + g.toString(16) : (g - 1).toString(16);
  //   b =
  //     b.toString(16).length === 1 ? "0" + b.toString(16) : (b - 1).toString(16);
  //   return "#" + String(r + g + b);
  // };

  const colorSet = [
    "#ffdddd",
    "#ffeedd",
    "#ffffdd",
    "#e5ffdd",
    "#ddfff6",
    "#ddeeff",
    "#e5ddff",
    "#ffddf6",
    "#ddffff",
  ];

  const changeDayToNum = (day) => {
    let dayNum = 2
    if (day == 'MON') dayNum = 2
    else if (day == 'TUE') dayNum = 3
    else if (day == 'WED') dayNum = 4
    else if (day == 'THU') dayNum = 5
    else if (day == 'FRI') dayNum = 6
    else dayNum = 7
    return dayNum
  }

  const { cookies } = useUserDataContext()
  const { delCart, count, getCart, cart_courses } = useCourseDataContext()
  const [checkedInputs, setCheckedInputs] = useState('')

  const changeTimeToNum = (time) => {
    let arr = time.split(':')
    let num = (parseInt(arr[0]) - 8) * 2 + 2
    let minute = parseInt(arr[1])
    if (minute >= 45) num += 2
    else if (minute >= 30) num += 1
    return num
  }

  const navigate = useNavigate()
  useEffect(() => {
    getCart()
  }, [])

  const allCells = () => {
    const cellArr = []
    let parsedTime = []
    let dayNum = 2,
      startTime = 2,
      endTime = 3,
      courseCount = 0
    console.log(cart_courses)
    for (let i = 0; i < cart_courses.length; i++) {
      parsedTime = cart_courses[i].parsed_time;
      let color = colorSet[i];
      for (let j = 0; j < parsedTime.length; j++) {
        courseCount++
        dayNum = changeDayToNum(parsedTime[j].day)
        startTime = changeTimeToNum(parsedTime[j].start_time)
        endTime = changeTimeToNum(parsedTime[j].end_time)

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
            {cart_courses[i].name}
          </StyledCell>,
        )
      }
    }
    return cellArr
  }

  return (
    <div>
      <div className="cart">
        <div className="cart-first">
          <div className="title">장바구니</div>
          <div className="body">
            <div className="time">
              2023년 01월 31일 09:00~23:59 <br />
              2023년 02월 01일 00:00~16:00
            </div>
            <div className="explain">
              ※ 마감시간 이후에는 변경이 불가하며, 인원충족 시 전산확정 됩니다.
              <br />※ 장바구니 담기 기간 이후의 변동내역은 장바구니에 적용되지
              않습니다.
            </div>
          </div>
        </div>
        <div className="cart-body">
          <div className="cart-list">
            <div className="header">
              <span className="content">
                <span>
                  신청가능학점&nbsp; <span>21</span>학점/
                </span>
                <span>
                  담은 학점&nbsp;
                  <span>
                    {cart_courses
                      .map(function (x) {
                        return x.credit
                      })
                      .reduce(function (a, b) {
                        return a + b
                      }, 0)}
                  </span>
                  학점
                </span>
              </span>
              <div className="button">
                <button onClick={() => delCart(checkedInputs)}>선택삭제</button>
                <button onClick={() => navigate('/interest/')}>관심강좌</button>
              </div>
              {cart_courses
                .map(function (x) {
                  return x.credit
                })
                .reduce(function (a, b) {
                  return a + b
                }, 0) !== 0 ? (
                <div></div>
              ) : (
                <div className="empty">
                  <div>장바구니가 비었습니다.</div>
                  <div>
                    검색 또는 관심강좌에서 수강신청 하실 강좌를 장바구니에
                    담으세요.
                  </div>
                </div>
              )}
            </div>
            {cart_courses.map((course) => (
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
            <h3>장바구니 시간표</h3>
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
        </a>{' '}
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
  )
}

export default Cart
