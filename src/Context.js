import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useStateDataContext } from "./StateContext";
const ClassDataContext = createContext();
export const ClassDataProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [pickcourses, setPickcourses] = useState([]);

  return (
    <ClassDataContext.Provider
      value={{ modal, setModal, pickcourses, setPickcourses }}
    >
      {children}
    </ClassDataContext.Provider>
  );
};
export const useClassDataContext = () => useContext(ClassDataContext);

const UserDataContext = createContext();
export function UserDataProvider({ children }) {
  const [loginState, setLoginState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState(1);
  const [program, setProgram] = useState("학사");
  const [yearOfEntrance, setYearOfEntrance] = useState(2023);
  const [cookies, setCookie] = useCookies(["token"]);
  const [updateReview, setUpdateReview] = useState(false);

  const tempMin = 10;
  const tempSec = 0;
  const initialTime = useRef(tempMin * 60 + tempSec);

  async function refreshFunc() {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    let bool = false;
    initialTime.current = 600;
    axios
      .post("https://snu-sugang.o-r.kr/user/refresh/", {
        refresh_token: refreshToken,
      })
      .then((response) => {
        console.log("login success");
        console.log(response.data.token);
        setCookie("token", response.data.token);
        localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
      })
      .then(() => {
        axios
          .get("https://snu-sugang.o-r.kr/user/current/", {
            headers: {
              Authorization: `token ${cookies.token}`,
              "Content-Type": `application/json`,
            },
          })
          .then((response) => {
            let arr = response.data;
            console.log(arr);
            setGrade(arr.academic_year);
            setCollege(arr.college);
            setDepartment(arr.department);
            setName(arr.name);
            setProgram(arr.program);
            setStudentId(arr.student_id);
            setYearOfEntrance(arr.year_of_entrance);
            setEmail(arr.email);
          })
          .then(() => {
            setLoginState(true);
            bool = true;
          });
      })
      .catch(() => {
        setLoginState(false);
        console.log("잘 안됨");
      });
    return bool;
  }

  async function loginFunc(userEmail, userPassword) {
    console.log("login trial");
    if (userEmail.includes("@snu")) {
      axios
        .post("https://snu-sugang.o-r.kr/user/login/", {
          email: userEmail,
          password: userPassword,
        })
        .then((response) => {
          setCookie("token", response.data.token);
          console.log("login success");
          console.log(response);
          console.log(response.data.token);
          localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
          localStorage.setItem("TOKEN", response.data.token);
          return response.data.token;
        })
        .then((token) => {
          axios
            .get("https://snu-sugang.o-r.kr/user/current/", {
              headers: {
                Authorization: `token ${token}`,
                "Content-Type": `application/json`,
              },
            })
            .then((response) => {
              let arr = response.data;
              console.log(arr);
              setGrade(arr.academic_year);
              setCollege(arr.college);
              setDepartment(arr.department);
              setName(arr.name);
              console.log("이름");
              console.log(arr.name);
              setProgram(arr.program);
              setStudentId(arr.student_id);
              setYearOfEntrance(arr.year_of_entrance);
            })
            .then(() => {
              setLoginState(true);
              toast.success("로그인되었습니다.");
            })
            .catch((e) => {
              console.log("error");
              console.log(e);
              toast.error("로그인에 실패했습니다.");
            });
        })
        .catch((e) => {
          console.log("error");
          console.log(e);
          toast.error("로그인에 실패했습니다.");
        });
    } else {
      toast.error("SNU 이메일로 로그인해주세요.");
    }
  }

  return (
    <UserDataContext.Provider
      value={{
        loginState,
        setLoginState,
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        college,
        setCollege,
        department,
        setDepartment,
        studentId,
        setStudentId,
        program,
        setProgram,
        yearOfEntrance,
        setYearOfEntrance,
        grade,
        setGrade,
        cookies,
        setCookie,
        loginFunc,
        refreshFunc,
        initialTime,
        updateReview,
        setUpdateReview,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
export const useUserDataContext = () => useContext(UserDataContext);

const CourseDataContext = createContext();
export function CourseDataProvider({ children }) {
  const { fetchState, state } = useStateDataContext();
  const { cookies, refreshFunc } = useUserDataContext();
  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search_word, setSearch_word] = useState("");
  const [word, setWord] = useState("");
  const [getting, setGetting] = useState(false);
  const [interest_courses, setInterest_courses] = useState([]);
  const [cart_courses, setCart_courses] = useState([]);
  const [enroll_courses, setEnroll_courses] = useState([]);
  const [registered_courses, setRegistered_courses] = useState([]);
  const [TT_courses, setTT_courses] = useState([]);
  const [registerparam, setRegisterparam] = useState([]);

  const fetchData = useCallback(() => {
    refreshFunc();
    if (getting === false) return;
    setWord(search_word);
    axios
      .get(`https://snu-sugang.o-r.kr/lectures/?`, {
        params: {
          keyword: search_word,
          page: page,
          ...registerparam,
        },
      })
      .then((res) => {
        console.log(res);
        setCourses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
    setGetting(false);
  }, [page, search_word, getting]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  function getRegistered() {
    refreshFunc();
    axios
      .get(`https://snu-sugang.o-r.kr/registered/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        setRegistered_courses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getInterests() {
    refreshFunc();
    axios
      .get(`https://snu-sugang.o-r.kr/interest/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        setInterest_courses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.course);
      });
  }

  function getCart() {
    refreshFunc();
    axios
      .get(`https://snu-sugang.o-r.kr/cart/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        setCart_courses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getTT(num) {
    console.log("gettingTT");
    refreshFunc();
    const link = `https://snu-sugang.o-r.kr/timetable/` + num + `/`;
    axios
      .get(link, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        setTT_courses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getEnroll() {
    refreshFunc();
    axios
      .get(`https://snu-sugang.o-r.kr/pending/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        setEnroll_courses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const TT2Cart = async (num) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    await axios
      .get(`https://snu-sugang.o-r.kr/state/`)
      .then((res) => {
        console.log(res);
        console.log(res.data.period);
        return res.data.period;
      })
      .then((state) => {
        if (state !== 1) {
          console.log(state);
          toast.error("장바구니 신청 기간이 아닙니다");
          return true;
        }
      })
      .then((ok) => {
        if (ok) return;
        const link = `https://snu-sugang.o-r.kr/cart/` + num + `/`;
        axios
          .post(
            link,
            {},
            {
              headers: {
                Authorization: `token ${cookies.token}`,
                "Content-Type": `application/json`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            toast.info("장바구니로 이동 되었습니다.");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addEnroll = async (id) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    await axios
      .get(`https://snu-sugang.o-r.kr/state/`)
      .then((res) => {
        console.log(res);
        console.log(res.data.period);

        return res.data.period;
      })
      .then((state) => {
        if (state !== 3) {
          console.log(state);
          toast.error("수강신청 기간이 아닙니다");
          return true;
        }
      })
      .then((ok) => {
        if (ok) return;
        axios
          .post(
            `https://snu-sugang.o-r.kr/registered/`,
            {
              id: id,
            },
            {
              headers: {
                Authorization: `token ${cookies.token}`,
                "Content-Type": `application/json`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            toast.info("수강신청 되었습니다.");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.course[0]);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addInterest = async (id) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    axios
      .post(
        `https://snu-sugang.o-r.kr/interest/`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.info("관심강좌로 저장되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.course[0]);
      });
  };

  const addCart = async (id) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    await axios
      .get(`https://snu-sugang.o-r.kr/state/`)
      .then((res) => {
        console.log(res);
        console.log(res.data.period);

        return res.data.period;
      })
      .then((state) => {
        if (state !== 1) {
          console.log(state);
          toast.error("장바구니 신청 기간이 아닙니다");
          return true;
        }
      })
      .then((ok) => {
        if (ok) return;
        axios
          .post(
            `https://snu-sugang.o-r.kr/cart/`,
            {
              id: id,
            },
            {
              headers: {
                Authorization: `token ${cookies.token}`,
                "Content-Type": `application/json`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            toast.info("장바구니로 저장되었습니다.");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.course[0]);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTT = async (id, num) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    const link = `https://snu-sugang.o-r.kr/timetable/` + num + `/`;
    axios
      .post(
        link,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.info("시간표에 추가되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.course[0]);
      });
  };

  const delRegistered = async (id) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    axios
      .delete(`https://snu-sugang.o-r.kr/registered/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("삭제되었습니다.");
        getRegistered();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delInterest = async (id) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    axios
      .delete(`https://snu-sugang.o-r.kr/interest/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
          "Content-Type": `application/json`,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        toast.info("삭제되었습니다.");
        getInterests();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delCart = async (id) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    axios
      .delete(
        `https://snu-sugang.o-r.kr/cart/`,

        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": `application/json`,
          },
          data: {
            id: id,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.info("삭제되었습니다.");
        getCart();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.detail);
      });
  };
  const delTT = async (id, num) => {
    refreshFunc();
    if (
      typeof cookies.token === "undefined" ||
      cookies.token === null ||
      cookies.token === ""
    ) {
      return;
    }
    axios
      .delete(
        `https://snu-sugang.o-r.kr/timetable/${num}/`,

        {
          headers: {
            Authorization: `token ${cookies.token}`,
            "Content-Type": `application/json`,
          },
          data: {
            id: id,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.info("삭제되었습니다.");
        getTT(num);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.detail);
      });
  };

  return (
    <CourseDataContext.Provider
      value={{
        courses,
        count,
        page,
        setPage,
        search_word,
        setSearch_word,
        setGetting,
        word,
        setWord,
        addEnroll,
        addInterest,
        addCart,
        delRegistered,
        delInterest,
        delCart,
        interest_courses,
        getInterests,
        cart_courses,
        getCart,
        enroll_courses,
        getEnroll,
        registered_courses,
        getRegistered,
        setRegisterparam,
        registerparam,
        addTT,
        getTT,
        delTT,
        TT_courses,
        TT2Cart,
      }}
    >
      {children}
    </CourseDataContext.Provider>
  );
}
export const useCourseDataContext = () => useContext(CourseDataContext);
