import styled from "styled-components";
import { useParams } from "react-router";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useClassDataContext, useUserDataContext } from "./Context";

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

const Star = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 1.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  width: 5em;
  input {
    display: none;
  }
  label {
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #2b2a29;
    cursor: pointer;
  }
  input:checked ~ label {
    -webkit-text-fill-color: gold;
  }

  label:hover,
  label:hover ~ label {
    -webkit-text-fill-color: #fff58c;
  }
`;
const Newreviewpage = styled.div`
  display: flex;
  padding: 1rem 3rem;
  margin-top: 30px;
  margin-left: 500px;
  margin-right: 50px;
  height: 500px;
  flex-direction: column;
  min-width: 400px;
  input[type="text"] {
    width: 100%;
  }
  button {
    border-radius: 7px;
  }
  textarea {
    width: 100%;
    height: 20rem;
  }
  > form > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Backbut = styled.button`
  width: 3rem;
`;
const Buttonbox = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    width: 3rem;
  }
`;

const Newreview = ({ setIsedit, isedit = false, edit = null }) => {
  const {
    cookies,
    updateReview,
    setUpdateReview,
    refreshFunc,
    setCookie,
    setLoginState,
  } = useUserDataContext();
  const { pickcourses, setPickcourses } = useClassDataContext();
  useEffect(() => {
    axios
      .get(`https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/?page=1`)
      .then((res) => {
        setPickcourses(res.data.course);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const courseid = useParams().courseid;
  const navigate = useNavigate();
  const [editrating, setEditrating] = useState(0);
  const submit = (e) => {
    e.preventDefault();
    if (e.target.title.value === "") {
      toast.error("제목을 작성해주세요.");
      return;
    } else if (e.target.content.value === "") {
      toast.error("내용을 작성해주세요.");
      return;
    }
    refreshFunc();
    setUpdateReview(!updateReview);
    const func = isedit ? axios.put : axios.post;
    const url =
      `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/` +
      (isedit ? edit.id + `/` : "");
    func(
      url,
      {
        title: e.target.title.value,
        content: e.target.content.value,
        rate: editrating,
        semester: "2022-2",
      },
      {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      }
    )
      .then((res) => {
        navigate(`/review/${courseid}`);
      })
      .catch((err) => {
        if (err.response.request.status === 409)
          toast.error("이미 리뷰를 작성하셨습니다.");
        else if (err.response.request.status === 403) {
          setLoginState(false);
          toast.info("로그아웃되었습니다.");
          localStorage.removeItem("REFRESH_TOKEN");
          localStorage.removeItem("TOKEN");
          setCookie("token", "");
        }
        navigate(`/review/${courseid}`);
      });
  };
  const dummy = [5, 4, 3, 2, 1];
  return (
    <div>
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
      <Newreviewpage>
        <form onSubmit={submit}>
          <div>
            <Star>
              {dummy.map((i) => (
                <Fragment key={i}>
                  <input
                    type="radio"
                    id={`${i}-stars`}
                    name="rating"
                    onChange={() => {
                      setEditrating(i);
                    }}
                    defaultChecked={edit?.rate === i ? true : false}
                  />
                  <label htmlFor={`${i}-stars`}>★</label>
                </Fragment>
              ))}
            </Star>
            <Buttonbox>
              <Backbut
                onClick={() => {
                  if (isedit) setIsedit(false);
                  else navigate(-1);
                }}
              >
                취소
              </Backbut>
              <button type="submit">{isedit ? "수정" : "등록"}</button>
            </Buttonbox>
          </div>
          <div>
            <span>제목</span>
            <input type="text" id="title" defaultValue={edit?.title} />
          </div>
          <div>
            <span>내용</span>
            <textarea id="content" defaultValue={edit?.content} />
          </div>
        </form>
      </Newreviewpage>
    </div>
  );
};
export default Newreview;
