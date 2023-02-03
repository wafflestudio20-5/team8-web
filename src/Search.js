import "./Search.css";
import { useCourseDataContext } from "./Context";
import React, { useEffect, useState } from "react";
import Course from "./Course";

const Search = () => {
  const {
    word,
    count,
    courses,
    page,
    setPage,
    setGetting,
    addInterest,
    addCart,
    addEnroll,
    addTT,
  } = useCourseDataContext();
  const [startNum, setStartNum] = useState(1);
  const [pageButtons, setPageButtons] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState("");

  useEffect(() => {
    function setButtons() {
      setGetting(true);
      const r = [];
      for (let i = startNum; i < startNum + 5 && i <= count / 10 + 1; i++) {
        r.push(
          <button
            key={i}
            type="button"
            className={page === i ? "pageNum clicked" : "pageNum"}
            onClick={() => {
              setPage(i);
              setGetting(true);
              console.log(page);
            }}
          >
            {i}
          </button>
        );
      }
      setPageButtons(r);
    }
    setButtons();
  }, [count, page, setPage, startNum, setGetting]);

  useEffect(() => {
    setPage(startNum);
  }, [startNum, setPage]);

  return (
    <div>
      <div id="wrap">
        <div className="list-body">
          <div className="list-area">
            <div className="first">
              <div className="result">
                <div className="oneline">
                  <div className="blue">'{word}'&nbsp;</div> 검색 결과
                </div>
              </div>
              <div className="oneline">
                <div className="num">{count}</div>건의 교과목이 검색되었습니다.
              </div>
            </div>

            {courses.map((course) => (
              <div className="item" key={course.id}>
                <Course
                  course={course}
                  checkedInputs={checkedInputs}
                  setCheckedInputs={setCheckedInputs}
                />
              </div>
            ))}
            <div className="line">
              총 <div className="num">{count}</div>건
            </div>
            <div className="pageButton">
              <button
                type="button"
                onClick={() => {
                  setStartNum(1);
                }}
              >
                {"<<"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStartNum(startNum - 5 < 1 ? startNum : startNum - 5);
                }}
              >
                {"<"}
              </button>
              {pageButtons}
              <button
                type="button"
                onClick={() => {
                  setStartNum(
                    startNum + 5 > parseInt(count / 10)
                      ? startNum
                      : startNum + 5
                  );
                }}
              >
                {">"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStartNum(parseInt(parseInt(count / 10) / 5) * 5);
                }}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="search-nav">
        <button
          className="interest-button"
          onClick={() => {
            addInterest(checkedInputs);
          }}
        >
          관심강좌 저장
        </button>
        <button
          className="search-cart-button"
          onClick={() => {
            addCart(checkedInputs);
          }}
        >
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
          <div className="nav-code">00</div>
          <input className="nav-code-input" placeholder="입력"></input>
        </div>
        <button
          className="enroll-button"
          onClick={() => {
            addEnroll(checkedInputs);
          }}
        >
          {" "}
          수강신청
        </button>
      </div>
    </div>
  );
};

export default Search;
