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


    email,


    setEmail,
    setPassword,
    setName,
    setCollege,
    setCookie,
    cookie,

    loginFunc,

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

    setEmail(response.profileObj.email);
    setPassword(response.profileObj.googleId);
    loginFunc(userEmail, userPassword);


    if (userEmail.includes("@snu.ac.kr")) {
      axios
        .post("https://snu-sugang.o-r.kr/user/login/", {
          email: userEmail,
          password: userPassword,
        })
        .then((response) => {
          console.log("login success");
          console.log(response.data.token);
          toast.success("로그인되었습니다.");
          setLoginState(true);
          setEmail(userEmail);
          setPassword(userPassword);
          setCookie("token", response.data.token);
          // 구현 필요!! axios.post --> get user info and set all the contexts
        })
        .catch((e) => {
          console.log("error");
          console.log(e);
          toast.error("로그인에 실패했습니다.");
        });
    } else {
      toast.error("SNU 이메일로 로그인해주세요.");
    }
  };

  const loginFailure = (response) => {
    console.log(response);
    toast.error("구글 로그인에 실패했습니다.");
  };

  let navigate = useNavigate();

  const signupSuccess = (response) => {
    console.log(response);
    let userEmail = response.profileObj.email;
    let userPassword = response.profileObj.googleId;
    if (userEmail.includes("@snu.ac.kr")) {
      axios
        .post("https://snu-sugang.o-r.kr/user/login/", {
          email: userEmail,
          password: userPassword,
        })
        .then(() => {
          toast.error("이미 가입된 이메일입니다.");
        })
        .catch(() => {
          setEmail(userEmail);
          setPassword(userPassword);
          let arr = response.profileObj.name.split(" / ");
          setName(arr[0]);
          setCollege(arr[2]);
          let link = "/register";
          navigate(link);
        });
    } else {
      toast.error("SNU 이메일로 가입해주세요.");
    }
  };

  const signupFailure = (response) => {
    console.log(response);
    toast.error("회원 가입에 실패했습니다.");
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
