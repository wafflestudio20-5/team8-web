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
const StateDataContext = createContext();
export function StateDataProvider({ children }) {
  const [state, setState] = useState(0);
  const fetchState = useCallback(() => {
    axios
      .get(`https://snu-sugang.o-r.kr/state/`)
      .then((res) => {
        console.log(res);
        console.log(res.data.period);
        setState(res.data.period);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);
  useEffect(() => {
    fetchState();
  }, [fetchState]);
  return (
    <StateDataContext.Provider
      value={{
        state,
        fetchState,
      }}
    >
      {children}
    </StateDataContext.Provider>
  );
}
export const useStateDataContext = () => useContext(StateDataContext);
