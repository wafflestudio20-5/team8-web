import styled from "styled-components";
import Starrating from "./Starrating";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useClassDataContext, useUserDataContext } from "./Context";

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
    color: #666;
    height: 4rem;
  }
  th {
    font-weight: 400;
    background: #f8f8f8;
    color: #333;
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
  margin-top: 1rem;
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
  const { loginState } = useUserDataContext();
  const courseid = useParams().courseid;
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const page1 = parseInt(page / 5) * 5 + 1;
  const dummy = [0, 1, 2, 3, 4];
  const { pickcourses } = useClassDataContext();
  useEffect(() => {
    axios
      .get(
        `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/?page=${page}`
      )
      .then((res) => {
        setReviews(res.data.results);
        setTotalPage(res.data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);
  return (
    <Reviewpage>
      <h1>
        {pickcourses.name}({pickcourses.professor}교수님)
      </h1>
      {loginState && (
        <button
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
                  <td>
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
