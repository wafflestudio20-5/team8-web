import "./Cart.css";
import { useUserDataContext, useCourseDataContext } from "./Context";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cookies } = useUserDataContext();
  const { delCart, count, getCart, cart_courses } = useCourseDataContext();
  const [checkedInputs, setCheckedInputs] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getCart();
  }, [getCart]);

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
                        return x.credit;
                      })
                      .reduce(function (a, b) {
                        return a + b;
                      }, 0)}
                  </span>
                  학점
                </span>
              </span>
              <div className="button">
                <button onClick={() => delCart(checkedInputs)}>선택삭제</button>
                <button onClick={() => navigate("/interest/")}>관심강좌</button>
              </div>
              <div>장바구니가 비었습니다.</div>
              <div>
                검색 또는 관심강좌에서 수강신청 하실 강좌를 장바구니에 담으세요.
              </div>
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

          <div className="cart-timetable"></div>
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

export default Cart;
