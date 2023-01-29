import './Course.css'
import { useCourseDataContext } from './Context'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClassDataContext } from './Context'
const Course = ({ key, course, setCheckedInputs, checkedInputs }) => {
  const navigate = useNavigate()
  key = course.id
  const { setModal, setPickcourses } = useClassDataContext()
  const changeHandler = (checked, id) => {
    console.log(checkedInputs)
    if (checked) {
      setCheckedInputs(id)
    } else {
      // 체크 해제
      setCheckedInputs('')
    }
  }
  return (
    <div
      className="course-info-item"
      onClick={() => {
        setModal(true)
        setPickcourses(course)
      }}
    >
      <div className="container">
        <div
          className="round"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <input
            id={`${key}`}
            type="checkbox"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, `${key}`)
            }}
            checked={checkedInputs === `${key}`}
          />
          <label htmlFor={`${key}`}></label>
        </div>
      </div>
      <div className="course-info-body">
        <div className="course-name">
          [{course.degree}] [{course.curriculum}]&nbsp;
          <strong>{course.name}</strong>{' '}
        </div>
        <ul className="course-info">
          <li className="txt">
            <span>{course.professor}&nbsp; |&nbsp;</span>
            <span>{course.department}&nbsp; | &nbsp;</span>
            <span>{course.number}</span>
          </li>
          <li className="txt">
            <span lang="ko">
              수강신청인원/정원(재학생){' '}
              <em>
                {course.current}/{course.maximum}
              </em>
              &nbsp; | &nbsp;
            </span>
            <span lang="ko">
              학점 <em>{course.credit}</em>&nbsp; | &nbsp;
            </span>
            <button
              className="reviewbtn"
              onClick={(e) => {
                e.stopPropagation()
                setPickcourses(course)
                navigate(`/review/${course.id}`)
              }}
            >
              리뷰보기
            </button>
          </li>
          <li className="state">
            <div className="icon-remo"></div>
          </li>
        </ul>
      </div>
      <div className="course-icons">
        <span className="carts">
          <img
            src={'/img-shopping-basket.gif'}
            alt={'cart'}
            className="cart-img"
          />
          <em title="장바구니"></em>
          &nbsp;{course.cart}
        </span>
      </div>
    </div>
  )
}

export default Course
