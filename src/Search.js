import "./Search.css";
import { useCourseDataContext, useUserDataContext } from "./Context";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { toast } from "react-toastify";

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

  const { loginState } = useUserDataContext();
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
    if (parseInt(secNum) === realNum) {
      setUpdate(!update);
      return true;
    } else {
      setUpdate(!update);
      return false;
    }
  };

  return (
    <div>
      <div id="wrap">
        <div className="list-body">
          <div className={loginState ? "list-area" : "list-area-big"}>
            <div className="first">
              <div className="result">
                <div className="oneline">
                  <div className="blue">'{word}'&nbsp;</div> ?????? ??????
                </div>
              </div>
              <div className="oneline">
                <div className="num">{count}</div>?????? ???????????? ?????????????????????.
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
              ??? <div className="num">{count}</div>???
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

      {loginState && (
        <div className="search-nav">
          <button
            className="interest-button"
            onClick={() => {
              addInterest(checkedInputs);
            }}
          >
            ???????????? ??????
          </button>
          <button
            className="search-cart-button"
            onClick={() => {
              addCart(checkedInputs);
            }}
          >
            {" "}
            ???????????? ??????
          </button>
          <button className="tt-button" onClick={() => addTT(checkedInputs)}>
            {" "}
            ???????????? ??????
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
              placeholder="??????"
              onChange={(e) => {
                setSecNum(e.target.value);
              }}
            ></input>
          </div>
          <button
            className="enroll-button"
            onClick={() => {
              if (checkSec()) addEnroll(checkedInputs);
              else toast.error("??????????????? ?????????????????????.");
            }}
          >
            {" "}
            ????????????
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
