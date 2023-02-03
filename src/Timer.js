import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";
import { useUserDataContext } from "./Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const Timer = (props) => {
  const [mount, setMount] = useState(false);
  const tempMin = 10;
  const tempSec = 0;
  const interval = useRef(null);
  const [min, setMin] = useState(padNumber(tempMin, 2));
  const [sec, setSec] = useState(padNumber(tempSec, 2));
  const { refreshed, setLoginState, refreshFunc, initialTime } =
    useUserDataContext();

  useEffect(() => {
    setMount(true);
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setSec(padNumber(initialTime.current % 60, 2));
      setMin(padNumber(parseInt(initialTime.current / 60), 2));
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  let navigate = useNavigate();

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
      navigate("/");
      setLoginState(false);
      toast.info("로그아웃되었습니다.");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("TOKEN");
    }
  }, [sec]);

  useEffect(() => {
    initialTime.current = 600;
  }, [refreshed]);

  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
      setLoginState(false);
      navigate("/");
      setLoginState(false);
      toast.info("로그아웃되었습니다.");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("TOKEN");
    }
  }, [sec]);

  return (
    <div className="timer-clock">
      {min} : {sec}
    </div>
  );
};

export default Timer;
