import React, { useCallback, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "./Context";
import "./GoogleButton.css";

const clientId =
  "414890087310-6tv4553dp68eedtanrvda6cu9dk3bjrm.apps.googleusercontent.com";

const GoogleButton = ({ onSocial }) => {
  const {
    loginState,
    setLoginState,
    setEmail,
    setPassword,
    setName,
    setCollege,
  } = useUserDataContext();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const loginSuccess = (response) => {
    console.log(response);
    let userEmail = response.profileObj.email;
    let userPassword = response.profileObj.googleId;
    if (userEmail.includes("@snu.ac.kr")) {
      axios
        .post("https://snu-sugang.o-r.kr/user/login/", {
          email: userEmail,
          password: userPassword,
        })
        .then((response) => {
          console.log("login success");
          console.log(response);
          setLoginState(true);
          setEmail(userEmail);
          setPassword(userPassword);
        })
        .catch((e) => {
          console.log("error");
          console.log(e);
          alert("로그인에 실패했습니다.");
          toast.error("로그인에 실패했습니다.");
        });
    } else {
      alert("SNU 이메일로 로그인해주세요.");
      toast.error("SNU 이메일로 로그인해주세요.");
    }
  };

  const loginFailure = (response) => {
    console.log(response);
    alert("구글 로그인에 실패했습니다.");
  };

  let navigate = useNavigate();

  const signupSuccess = (response) => {
    console.log(response);
    let userEmail = response.profileObj.email;
    let userPassword = response.profileObj.googleId;
    if (userEmail.includes("@snu.ac.kr")) {
      // 이미 가입된 이메일인지 확인하는 절차 필요 (axios.get??)
      setEmail(userEmail);
      setPassword(userPassword);
      let arr = response.profileObj.name.split(" / ");
      setName(arr[0]);
      setCollege(arr[2]);
      let link = "/register";
      navigate(link);
    } else {
      alert("SNU 이메일로 가입해주세요.");
    }
  };

  const signupFailure = (response) => {
    console.log(response);
    alert("회원 가입에 실패했습니다.");
  };

  return (
    <div className="login-container">
      {!loginState && (
        <div className="login-box">
          <GoogleLogin
            className="google-button"
            clientId={clientId}
            buttonText="로그인"
            onSuccess={loginSuccess}
            onFailure={loginFailure}
          />
          &nbsp;
          <GoogleLogin
            className="google-button"
            clientId={clientId}
            buttonText="회원가입"
            onSuccess={signupSuccess}
            onFailure={signupFailure}
          />
        </div>
      )}
    </div>
  );
};

export default GoogleButton;
