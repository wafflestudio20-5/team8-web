import React, { useCallback, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./GoogleButton.css";

const clientId =
  "414890087310-6tv4553dp68eedtanrvda6cu9dk3bjrm.apps.googleusercontent.com";

const GoogleButton = ({
  onSocial,
  loginState,
  setLoginState,
  userId,
  setUserId,
}) => {
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
    if (userEmail.includes("@snu.ac.kr")) {
      axios
        .post("https://snu-sugang.o-r.kr/user/login/", {
          email: userEmail,
        })
        .then((response) => {
          setLoginState(true);
          setUserId(userEmail);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      toast.error("SNU 이메일로 로그인해주세요.");
    }
  };

  const loginFailure = (response) => {
    console.log(response);
    toast.error("구글 로그인에 실패했습니다.");
  };

  const signupSuccess = (response) => {
    console.log(response);
    let link = "/register";
    useNavigate(link);
  };

  const signupFailure = (response) => {
    console.log(response);
    toast.error("회원 가입에 실패했습니다.");
  };

  return (
    <div className="login-box">
      {!loginState && (
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="로그인"
            onSuccess={loginSuccess}
            onFailure={loginFailure}
          />
          &nbsp;
          <GoogleLogin
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
