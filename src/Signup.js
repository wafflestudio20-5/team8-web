import "./Register.css";
import { useUserDataContext } from "./Context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { collapseToast, toast } from "react-toastify";

const Signup = () => {
    const {
        name,
        email,
        password,
        college,
        setCollege,
        department,
        setDepartment,
        studentId,
        setStudentId,
        yearOfEntrance,
        setYearOfEntrance,
        program,
        setProgram,
        grade,
        setGrade,
    } = useUserDataContext();
    // 학번, 이름, 이수과정, 학년, 입학년도, 등록횟수, 주전공, 부전공, 복수전공

    useEffect(() => {
        if (studentId.length > 3)
            setYearOfEntrance(parseInt(studentId.substring(0, 4)));
    }, [studentId]);

    let navigate = useNavigate();

    const signup = () => {
        axios
            .post("https://snu-sugang.o-r.kr/user/register/", {
                email: email,
                password: password,
                name: name,
                student_id: studentId,
                college: college,
                department: department,
                program: program,
                academic_year: grade,
                year_of_entrance: yearOfEntrance,
            })
            .then((response) => {
                console.log("sign-up success");
                console.log(response);
                toast.success("가입되었습니다.");
                navigate(-1);
            })
            .catch((response) => {
                console.log("sign-up failed");
                toast.error("회원가입에 실패했습니다.");
                navigate(-1);
            });
    };

    const cancel = () => {
        navigate(-1);
    };

    return (
        <div className="register-container">
            <div className="register-title">회원가입</div>
            <div className="register-contents">
                <form className="form">
                    <span className="bold-title">이름 </span>
                    <span className="register-content">{name}</span>
                    <br />
                    <span className="bold-title">이메일</span>
                    {email}
                    <br />
                    <span className="bold-title">소속 대학</span>
                    <input
                        className="register-input"
                        placeholder="공과대학"
                        onChange={(e) => setCollege(e.target.value)}
                    />
                    <span className="bold-title">소속 학과</span>
                    <input
                        className="register-input"
                        placeholder="컴퓨터공학부"
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <br />
                    <span className="bold-title">학번</span>
                    <input
                        className="register-input"
                        placeholder="2022-12345"
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <span className="bold-title">입학년도</span>
                    <input
                        className="register-input"
                        value={yearOfEntrance}
                        placeholder="2022"
                        onChange={(e) => setYearOfEntrance(e.target.value)}
                    />
                    <br />
                    <span className="bold-title">이수 과정</span>
                    <select
                        className="register-select"
                        onChange={(e) => setProgram(e.target.value)}
                    >
                        <option key="학사" value="학사">
                            학사
                        </option>
                        <option key="석사" value="석사">
                            석사
                        </option>
                        <option key="박사" value="박사">
                            박사
                        </option>
                    </select>
                    <span className="bold-title">학년</span>
                    <select
                        className="register-select"
                        onChange={(e) => setGrade(parseInt(e.target.value))}
                    >
                        <option key="1" value="1">
                            1학년
                        </option>
                        <option key="2" value="2">
                            2학년
                        </option>
                        <option key="3" value="3">
                            3학년
                        </option>
                        <option key="4" value="4">
                            4학년
                        </option>
                        <option key="5" value="5">
                            추가 학기
                        </option>
                    </select>
                </form>
            </div>
            <div className="register-buttons">
                <button type="button" className="register-button" onClick={signup}>
                    가입
                </button>
                <button
                    type="button"
                    className="register-button-cancel"
                    onClick={cancel}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default Signup;
