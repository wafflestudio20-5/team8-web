import styled from "styled-components";
import axios from "axios";
import Starrating from "./Starrating";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Newreview from "./Newreview";
import { useClassDataContext, useUserDataContext } from "./Context";
import "./Reviewcontent.css";

const Detailcap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  line-height: 1.5;
  background: #f8f8f8;
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    li {
      list-style: none;
    }
    li > span:not(:first-of-type):before {
      content: " ";
      border-left: 1px solid #ccc;
      color: #ccc;
      font-size: 1rem;
      margin: 0 10px;
      line-height: 30px;
    }
    em {
      color: #376dc8;
    }
  }
`;

const Revcon = styled.div`
  display: flex;
  flex-direction: column;
  //padding: 1rem 3rem;
  min-height: 520px;
  margin-left: 540px;
  margin-right: 300px;
  margin-bottom: 40px;
  margin-top: 10px;
  //background-color: gainsboro;
`;
const Reviewbox = styled.div`
  margin: 2rem 0;
  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  > div > div:nth-child(1) {
    //width: fit-content;
  }
  button {
    width: 3rem;
    margin: 3px;
    margin-left: 10px;
    border-radius: 5px;
  }
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-bottom: 1rem;
  //border: 1px solid black;
  //border-radius: 1rem;
`;
const Commentlist = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 2.5%;
  padding-right: 7%;
  width: 47vw;
  textarea {
    width: 95%;
    margin: 0.5rem;
  }
  margin-left: 20px;
  button[type="submit"] {
    width: 3rem;
  }
`;

const Commentbox = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  border-bottom: 1px solid black;
  padding: 0.5rem;
  align-items: center;
  margin-left: 10px;
  font-size: 0.8rem;
  > div {
    display: flex;
    align-items: center;
  }
  div:nth-child(1) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  span:nth-child(1) {
    width: 80%;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  button {
    width: 4rem;
  }
`;

const Icon = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(100%);
`;
const Reviewcontent = () => {
  const navigate = useNavigate();
  const courseid = useParams().courseid;
  const reviewid = useParams().reviewid;
  const [picked, setPicked] = useState(0);
  const [isedit, setIsedit] = useState(false);
  const { cookies, name, loginState } = useUserDataContext();
  const { pickcourses, setPickcourses } = useClassDataContext();

  const times = [
    { time: "분", value: 1000 * 60 },
    { time: "시간", value: 1000 * 60 * 60 },
    { time: "일", value: 1000 * 60 * 60 * 24 },
    { time: "주", value: 1000 * 60 * 60 * 24 * 7 },
    { time: "개월", value: 1000 * 60 * 60 * 24 * 30 },
    { time: "년", value: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();
  const elapsedTime = (time) => {
    const now = new Date();
    const past = new Date(time);
    const diff = now.getTime() - past.getTime();
    for (const value of times) {
      const between = Math.floor(diff / value.value);
      if (between > 0) {
        return `${between}${value.time}전`;
      }
    }
    return "방금전";
  };
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/?page=1`)
      .then((res) => {
        setPickcourses(res.data.course);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(
        `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/${reviewid}/`,
        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(
        `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/${reviewid}/comments/`,
        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const submit = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/${reviewid}/comments/`,
        {
          content: e.target.comment.value,
        },
        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        e.target.comment.value = "";
        setComments([res.data, ...comments]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [edit, setEdit] = useState("");
  return (
    <div className="big-container">
      <div className="side-bar">
        <h2>수강평</h2>
        <h3>: {pickcourses.name}</h3>
        <Detailcap>
          <ul>
            <li>
              <span>{pickcourses.curriculum}</span>
              <span>{pickcourses.degree}</span>
              <span>{pickcourses.grade}학년</span>
            </li>
            <li>
              <span>{pickcourses.professor}</span>
              <span>{pickcourses?.department}</span>
            </li>
          </ul>
          <ul>
            <li>{pickcourses?.number}</li>
            <li>
              학점-강의-실습 &nbsp;
              <em>
                {pickcourses.credit}-{pickcourses.lecture}-{pickcourses.lab}
              </em>
            </li>
          </ul>
          교시별 수업형태(강의실 동-호):&nbsp;
          {pickcourses.classroom}
          <br />
          <br />
          정원: {pickcourses?.maximum}명
          <br />
          강의평가(5점만점): {Math.round(pickcourses?.rate * 100) / 100}
        </Detailcap>
      </div>
      <Revcon>
        {isedit ? (
          <Newreview setIsedit={setIsedit} isedit={true} edit={reviews} />
        ) : (
          <Reviewbox>
            <div className="review-title-container">
              <div className="review-title">
                <span className="review-title-words">{reviews.title}</span>
                <div className="review-writer">
                  <div className="review-header">
                    <div>글쓴이: {reviews.created_by}</div>
                    <div>{elapsedTime(reviews.created_at)}</div>
                  </div>
                </div>
                <Starrating rating={reviews.rate} />
              </div>
              {reviews.created_by === name && (
                <div className="review-buttons">
                  <button
                    onClick={() => {
                      setIsedit(true);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      axios
                        .delete(
                          `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/${reviewid}/`,
                          {
                            headers: {
                              Authorization: `token ${cookies.token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res.data);
                          navigate(`/review/${courseid}`);
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
            <br />
            <p className="review-content">{reviews.content}</p>
          </Reviewbox>
        )}
        <Commentlist>
          <span>댓글</span>
          {comments.map((item) => (
            <Commentbox key={item.id}>
              {picked === item.id ? (
                <div>
                  <textarea
                    defaultValue={item.content}
                    onChange={(e) => {
                      setEdit(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      setPicked(0);
                      axios
                        .put(
                          `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/${reviewid}/comments/${item.id}/`,
                          {
                            content: edit,
                          },
                          {
                            headers: {
                              Authorization: `token ${cookies.token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res.data);
                          setComments(
                            comments.map((comment) =>
                              comment.id === item.id ? res.data : comment
                            )
                          );
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    수정
                  </button>
                </div>
              ) : (
                <div>
                  <span>{item.content}</span>

                  <span>
                    {reviews.created_by === item.created_by
                      ? "글쓴이"
                      : item.created_by}
                  </span>

                  <span>{elapsedTime(item.created_at)}</span>
                </div>
              )}
              {item.created_by === name ? (
                <Icon>
                  <img
                    src={"/edit.svg"}
                    alt="edit"
                    onClick={() => {
                      setPicked(item.id);
                    }}
                  />
                  <img
                    src={"/delete.svg"}
                    alt="delete"
                    onClick={() => {
                      axios
                        .delete(
                          `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/${reviewid}/comments/${item.id}/`,
                          {
                            headers: {
                              Authorization: `token ${cookies.token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res.data);
                          setComments(
                            comments.filter((comment) => comment.id !== item.id)
                          );
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  />
                </Icon>
              ) : null}
            </Commentbox>
          ))}
          {loginState && (
            <div>
              <form onSubmit={submit}>
                <textarea id="comment" />
                <button type="submit">작성</button>
              </form>
            </div>
          )}
        </Commentlist>
      </Revcon>
    </div>
  );
};
export default Reviewcontent;
