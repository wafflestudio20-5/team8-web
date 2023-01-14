import "./Course.css";
import { useCourseDataContext } from "./Context";
import React, { useContext, useState } from "react";

const Course = ({ key, course, setCheckedInputs, checkedInputs }) => {
  key = course.id;
  const changeHandler = (checked, id) => {
    console.log(checkedInputs);
    if (checked) {
      setCheckedInputs(id);
    } else {
      // 체크 해제
      setCheckedInputs("");
    }
  };
  return (
    <div className="course-info-item">
      <div className="container">
        <div className="round">
          <input
            id={`checkbox ${key}`}
            type="checkbox"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, `checkbox ${key}`);
            }}
            checked={checkedInputs?.includes(`checkbox ${key}`)}
          />
          <label htmlFor={`checkbox ${key}`}></label>
        </div>
      </div>
      <div className="course-info-body">
        <div className="course-name">
          [{course.degree}] [{course.curriculum}]&nbsp;
          <strong>{course.name}</strong>{" "}
        </div>
        <ul className="course-info">
          <li className="txt">
            <span>{course.professor}&nbsp; |&nbsp;</span>
            <span>{course.department}&nbsp; | &nbsp;</span>
            <span>{course.number}</span>
          </li>
          <li className="txt">
            <span lang="ko">
              수강신청인원/정원(재학생){" "}
              <em>
                {course.current}/{course.maximum}
              </em>
              &nbsp; | &nbsp;
            </span>
            <span lang="ko">
              학점 <em>{course.credit}</em>&nbsp; | &nbsp;
            </span>
          </li>
          <li className="state">
            <div className="icon-remo"></div>
          </li>
        </ul>
      </div>
      <div className="course-icons">
        <span className="carts">
          <img
            src={"/img-shopping-basket.gif"}
            alt={"cart"}
            className="cart-img"
          />
          <em title="장바구니"></em>
          &nbsp;{course.cart}
        </span>
      </div>
    </div>
  );
};

export default Course;
