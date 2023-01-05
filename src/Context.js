import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "axios";

const CourseDataContext = createContext();

export function CourseDataProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const fetchData = useCallback(() => {
    axios
      .get(
        `http://ec2-13-125-66-192.ap-northeast-2.compute.amazonaws.com:8000/lectures/?page=${page}`
      )
      .then((res) => {
        console.log(res);
        setCourses(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <CourseDataContext.Provider value={{ courses, count, page, setPage }}>
      {children}
    </CourseDataContext.Provider>
  );
}

export const useCourseDataContext = () => useContext(CourseDataContext);
