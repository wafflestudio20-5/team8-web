import "./Bottom.css";
import Timer from "./Timer";
import { useUserDataContext } from "./Context";
import { useState } from "react";

const Bottom = () => {
  const { loginState, refreshFunc } = useUserDataContext();
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
        <div className="timer-explanation">
          자동 로그아웃
          남은시간&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Timer update={update} />
          <br />
          <span className="darkgray-word">
            10분간 사용하지 않을 경우 자동로그아웃 됩니다.
          </span>
        </div>
      )}
      {loginState && (
        <div>
          <button
            className="refresh-button"
            onClick={() => {
              refreshFunc();
              setUpdate(!update);
            }}
          >
            지금 로그인 연장
          </button>
        </div>
      )}
    </div>
  );
};

export default Bottom;
