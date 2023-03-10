import "./Enroll.css";
import {
  useUserDataContext,
  useCourseDataContext,
  useClassDataContext,
} from "./Context";
import { useStateDataContext } from "./StateContext";
import React, { useCallback, useState, useEffect } from "react";
import Course from "./Course";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Enroll = () => {
  let navigate = useNavigate();
  const { cookies } = useUserDataContext();
  const {
    addEnroll,
    count,
    setCount,
    enroll_courses,
    page,
    setPage,
    getEnroll,
    interest_courses,
    getInterests,
    setGetting,
    courses,
    setSearch_word,
    registered_courses,
  } = useCourseDataContext();

  const [clicked, setClicked] = useState("cart");
  const [startNum, setStartNum] = useState(1);
  const [pageButtons, setPageButtons] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState("");

  useEffect(() => {
    function setButtons() {
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
    if (parseInt(secNum) === realNum) return true;
    else return false;
  };

  const fetchState = async () => {
    await axios
      .get(`https://snu-sugang.o-r.kr/state/`)
      .then((res) => {
        return res.data.period;
      })
      .then((state) => {
        if (state !== 3) {
          navigate("/");
          toast.error("???????????? ????????? ????????????");
        }
        if (clicked === "cart") getEnroll();
        if (clicked === "interest") getInterests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchState();
  }, []);

  const { modal } = useClassDataContext();

  return (
    <div>
      <div id="wrap">
        <div className="list-body">
          <div className="list-area">
            <div className="enroll-first">
              <div className="title">????????????</div>
              <div className="button">
                <button
                  className={clicked === "cart" ? "clicked" : ""}
                  onClick={() => {
                    setClicked("cart");
                    setCount(0);
                  }}
                >
                  ???????????? ????????????
                </button>
                <button
                  className={clicked === "interest" ? "clicked" : ""}
                  onClick={() => {
                    setClicked("interest");
                    setCount(0);
                  }}
                >
                  ????????????
                </button>
                <button
                  className={clicked === "search" ? "clicked" : ""}
                  onClick={() => {
                    setClicked("search");
                    setCount(0);
                  }}
                >
                  ???????????????
                </button>
              </div>
              <span className="content">
                <span>
                  <span>
                    ??????????????????&nbsp; <span>21</span>??????/
                  </span>
                  <span>
                    ????????????&nbsp;
                    <span>
                      {enroll_courses
                        .map(function (x) {
                          return x.credit;
                        })
                        .reduce(function (a, b) {
                          return a + b;
                        }, 0)}
                    </span>
                    ??????/
                  </span>
                  <span>
                    ????????????&nbsp;<span>{registered_courses.length}</span>??????
                  </span>
                </span>
                {clicked === "search" ? (
                  <span>
                    <input
                      type="text"
                      onKeyDown={(e) => setSearch_word(e.target.value)}
                      onChange={(e) => {
                        setSearch_word(e.target.value);
                      }}
                    />
                    <button
                      className="searchButton"
                      onClick={() => setGetting(true)}
                    >
                      ??????
                    </button>
                  </span>
                ) : (
                  <div></div>
                )}
              </span>
            </div>
            <div>
              {clicked === "cart" ? (
                enroll_courses.map((course) => (
                  <div className="item">
                    <Course
                      course={course}
                      key={course.id}
                      checkedInputs={checkedInputs}
                      setCheckedInputs={setCheckedInputs}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
              {clicked === "interest" ? (
                interest_courses.map((course) => (
                  <div className="item">
                    <Course
                      course={course}
                      key={course.id}
                      checkedInputs={checkedInputs}
                      setCheckedInputs={setCheckedInputs}
                    />
                  </div>
                ))
              ) : (
                <div></div>
              )}
              {clicked === "search" ? (
                <div>
                  {courses.map((course) => (
                    <div className="item">
                      <Course
                        course={course}
                        key={course.id}
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
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        {!modal && (
          <div className="nav">
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
                setUpdate(!update);
                if (checkedInputs === "") toast.error("????????? ??????????????????.");
                else {
                  if (checkSec()) addEnroll(checkedInputs);
                  else toast.error("??????????????? ?????????????????????.");
                }
              }}
            >
              {" "}
              ????????????
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enroll;
