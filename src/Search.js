import "./Search.css";
import { useCourseDataContext } from "./Context";
import React, { useEffect, useState } from "react";

const Search = () => {
  const { count, courses, page, setPage } = useCourseDataContext();
  const [startNum, setStartNum] = useState(1);
  const [pageButtons, setPageButtons] = useState([]);

  useEffect(() => {
    function setButtons() {
      const r = [];
      for (let i = startNum; i < startNum + 5 && i <= count / 10 + 1; i++) {
        r.push(
          <button
            type="button"
            className={page === i ? "pageNum clicked" : "pageNum"}
            onClick={() => {
              setPage(i);
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
  }, [count, page, setPage, startNum]);

  useEffect(() => {
    console.log(page);
    setPage(startNum);
    console.log(page);
  }, [startNum, setPage]);

  return (
    <body>
      <div id="wrap">
        <div className="list-body">
          <div className="list-area">
            <div className="padding"></div>
            <div className="first">검색 결과</div>
            {courses.map((course) => (
              <div className="item">{course.name}</div>
            ))}
            <div>총 {count}건</div>
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
      <footer>footer</footer>
      <div className="nav"></div>
    </body>
  );
};

export default Search;
