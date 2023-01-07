import "./Login.css";
import axios from "axios";

const Login = ({ setLoginSate, userId, setUserId, password, setPassword }) => {
  const loginFunc = () => {
    axios
      .post("https://snu-sugang.o-r.kr/user/login/", {
        email: userId + "@snu.ac.kr",
        password: password,
      })
      .then((response) => {
        setLoginSate(true);
        console.log(response);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div className="login-container">
      <div className="blue-words">로그인 하세요.</div>
      <div className="login-input-box">
        <input
          className="login-input"
          type="text"
          id="id"
          placeholder="마이스누 아이디"
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <input
          className="login-input"
          type="password"
          id="password"
          placeholder="마이스누 비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="login-box" onClick={loginFunc}>
          로그인
        </div>
      </div>
      <div className="login-info">
        본인 아이디 또는 비밀번호 찾기가 가능합니다.
        <br />
        <a>아이디 찾기 </a>
        <a>/ 비밀번호 찾기 </a>
        <a>/ 회원가입</a>
      </div>
    </div>
  );
};
export default Login;
