import "./Bottom.css";
import Timer from "./Timer";
import { useUserDataContext } from "./Context";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Bottom = () => {
  const { loginState, refreshFunc, initialTime } = useUserDataContext();
  const { update, setUpdate } = useState(false);
  return (
    <div className="bottom">
      <div>
        <a href="https://www.snu.ac.kr/personal_information">
          개인정보취급방침
        </a>{" "}
        &nbsp;|&nbsp;
        <a href="https://www.snu.ac.kr/prohibition_of_unauthorized_email_collection">
          이메일무단수집거부
        </a>
        <br />
        <span className="darkgray-word">
          Copyright (C) 2020 SEOUL NATIONAL UNIVERSITY WAFFLESTUDIO TEAM8. All
          Rights Reserved.
        </span>
      </div>
      {loginState && (
        <div className="timer-container">
          <div className="timer-explanation">
            <span>자동 로그아웃 남은시간</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Timer update={update} />
            <br />
            <span className="darkgray-word-1">
              10분간 사용하지 않을 경우 자동로그아웃 됩니다.
            </span>
          </div>
          <div>
            <button
              className="refresh-button"
              onClick={() => {
                refreshFunc();
                initialTime.current = 600;
                toast.success("로그인 연장되었습니다.");
              }}
            >
              지금 로그인 연장
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bottom;
