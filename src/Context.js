import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
export const useUserDataContext = () => useContext(UserDataContext);

const CourseDataContext = createContext();
export function CourseDataProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search_word, setSearch_word] = useState("");
  const [word, setWord] = useState("");
  const [getting, setGetting] = useState(false);
  const [interest_courses, setInterest_courses] = useState([]);
  const [cart_courses, setCart_courses] = useState([]);
  const [enroll_courses, setEnroll_courses] = useState([]);
  const fetchData = useCallback(() => {
    if (getting === false) return;
    setWord(search_word);
    axios
      .get(
        `https://snu-sugang.o-r.kr/lectures/?keyword=${search_word}&page=${page}`
      )
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

  function getInterests() {
    axios
      .get(`https://snu-sugang.o-r.kr/interest/`, {
        headers: {
          Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res);
        setInterest_courses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.course);
      });
  }

  function getCart() {
    axios
      .get(`https://snu-sugang.o-r.kr/cart/`, {
        headers: {
          Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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

  function getEnroll() {
    axios
      .get(`https://snu-sugang.o-r.kr/pending/`, {
        headers: {
          Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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

  const addEnroll = async (id) => {
    axios
      .post(
        `https://snu-sugang.o-r.kr/registered/`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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
  };

  const addInterest = async (id) => {
    axios
      .post(
        `https://snu-sugang.o-r.kr/interest/`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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
    axios
      .post(
        `https://snu-sugang.o-r.kr/cart/`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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
  };
  const delEnroll = async (id) => {
    axios
      .delete(`https://snu-sugang.o-r.kr/registered/`, {
        headers: {
          Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
          "Content-Type": `application/json`,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
        toast.info("삭제되었습니다.");
        getEnroll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delInterest = async (id) => {
    axios
      .delete(`https://snu-sugang.o-r.kr/interest/`, {
        headers: {
          Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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
    axios
      .delete(
        `https://snu-sugang.o-r.kr/cart/`,

        {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
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
        delEnroll,
        delInterest,
        delCart,
        interest_courses,
        getInterests,
        cart_courses,
        getCart,
        enroll_courses,
        getEnroll,
      }}
    >
      {children}
    </CourseDataContext.Provider>
  );
}
export const useCourseDataContext = () => useContext(CourseDataContext);
