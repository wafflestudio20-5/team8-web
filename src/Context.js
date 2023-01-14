import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

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
  const [getting, setGetting] = useState(true);
  const fetchData = useCallback(() => {
    if (getting === false) return;
    setWord(search_word);
    axios
      .get(`https://snu-sugang.o-r.kr/lectures/?page=${page}`, {
        data: {
          keyword: search_word,
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
      }}
    >
      {children}
    </CourseDataContext.Provider>
  );
}
export const useCourseDataContext = () => useContext(CourseDataContext);
