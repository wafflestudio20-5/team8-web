import styled from "styled-components";
import Starrating from "./Starrating";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useClassDataContext, useUserDataContext } from "./Context";
import "./Review.css";

const Reviewpage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  > button {
    width: 6rem;
  }
  height: 120vh;
`;
const Reviewlist = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }
  td,
  th {
    text-align: center;
    font-size: 14px;
    border: 0;
  }
  td {
    font-weight: 300;
    color: black;
    height: 4rem;
  }
  th {
    font-weight: 400;
    background: #f8f8f8;
    color: black;
    height: 50px;
  }
  tr {
    border-bottom: 1px solid #e7e7e7;
  }
`;
const Pagelist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;
const Pagebutton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 1px solid #e7e7e7;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  margin: 0 0.5rem;
  cursor: pointer;
  background: ${(props) => (props.picked ? "gray" : "#fff")};
`;

const Review = () => {
  const { loginState, cookies, updateReview } = useUserDataContext();
  const courseid = useParams().courseid;
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const page1 = parseInt(page / 5) * 5 + 1;
  const dummy = [0, 1, 2, 3, 4];
  const { pickcourses, setPickcourses } = useClassDataContext();
  useEffect(() => {
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      axios
        .get(
          `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/?page=${page}`
        )
        .then((res) => {
          console.log("여기");
          console.log(res);
          setPickcourses(res.data.course);
          setReviews(res.data.results);
          setTotalPage(parseInt((res.data.count - 1) / 10) + 1);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .get(
          `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/?page=${page}`,
          {
            headers: {
              Authorization: `token ${cookies.token}`,
              "Content-Type": `application/json`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setPickcourses(res.data.course);
          console.log(res.data.course.name);
          console.log(pickcourses.name);
          setReviews(res.data.results);
          setTotalPage(parseInt((res.data.count - 1) / 10) + 1);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [page, updateReview]);

  return (
    <Reviewpage>
      <h1 className="course-title">
        {pickcourses.name}({pickcourses.professor}교수님)
      </h1>
      {loginState && (
        <button
          className="write-button"
          onClick={() => {
            navigate(`/newreview/${courseid}`);
          }}
        >
          글쓰기
        </button>
      )}
      <Reviewlist>
        <table>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>별점</th>
              <th>제목</th>
              <th>수강학기</th>
              <th>작성자</th>
              <th>작성날짜</th>
            </tr>
            {reviews.map((review) => {
              return (
                <tr
                  key={review.id}
                  onClick={() => {
                    navigate(`/reviewcontent/${courseid}/${review.id}`);
                  }}
                >
                  <td className="star-rating">
                    <Starrating rating={review.rate} />
                  </td>
                  <td>{review.title}</td>
                  <td>{review.semester}</td>
                  <td>{review.created_by}</td>
                  <td>{review.created_at.split("T")[0]}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </Reviewlist>
      <Pagelist>
        <button
          disabled={page1 <= 5}
          onClick={() => {
            setPage(parseInt(page / 5 - 1) * 5);
          }}
        >
          {"<<"}
        </button>
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          {"<"}
        </button>
        {dummy.map((i) => {
          return (
            page1 + i <= totalPage && (
              <Pagebutton
                key-={page1 + i}
                onClick={() => {
                  setPage(page1 + i);
                }}
                picked={page1 + i === page}
              >
                {page1 + i}
              </Pagebutton>
            )
          );
        })}
        <button
          disabled={page === totalPage}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {">"}
        </button>
        <button
          disabled={page1 + 4 >= totalPage}
          onClick={() => {
            setPage(parseInt(page / 5 + 1) * 5 + 1);
          }}
        >
          {">>"}
        </button>
      </Pagelist>
    </Reviewpage>
  );
};

export default Review;
