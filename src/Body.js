import './Body.css'

const Body = () => {
  return (
    <div>
      <div className="whole-container">
        <div className="body-container">
          <div className="body-item">
            <div className="body-header">
              &nbsp;
              <span className="blue-words">2022 겨울학기</span> 수강신청 기간
              안내 &nbsp;&nbsp;
              <span className="gray-words">
                ※ 장바구니는 선착순이 아닙니다.
              </span>
            </div>
            <div className="info-table-container">
              <table height="100px" width="100%">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>일자</th>
                    <th>시간</th>
                    <th>대상</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>수강취소(개강후)</td>
                    <td>2022-12-22(목)&nbsp;~&nbsp;2023-01-09(월)</td>
                    <td>00:00~23:59</td>
                    <td>
                      2/3 환불(~1/3),
                      <br />
                      1/2 환불(~1/9)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="body-item">
            <div className="manual">
              <a href="https://now.snu.ac.kr/popup/card/37">
                <div className="blue-box">
                  장바구니 초보를 위한 수강신청 안내
                </div>
              </a>
              <a href={'/public/manual.pdf'} download>
                <div className="blue-box">수강신청방법 매뉴얼</div>
              </a>
            </div>
          </div>
          <div className="body-item">
            <div className="body-header">
              &nbsp;
              <span className="blue-words">수강안내</span>
            </div>
            <br />
            <br />
            <div className="body-article">
              * 2022학년도 2학기에 수강중인 교과목을 동계 계절수업에 바로
              수강신청할 경우,
              <br />
              수강신청 내역 취소처리 또는 성적상의 불이익(재수강 미인정,
              동일과목 성적 중복 인정)이 발생할 수 있습니다.
              <br />
              <br />
              ★ 로그인 없이도 강좌 검색이 가능합니다.
              <br />
              - 전체 강좌 검색(검색창 돋보기(검색) 아이콘 클릭)
              <br />
              - 조건별 강좌 검색(검색상 돋보기(검색) 아이콘 옆 간편/상세검색
              아이콘 클릭)
              <br />
              <br />
              ★ 이전학기 교과목 검색
              <br />
              검색창 상세조건 아이콘(돋보기 버튼 옆) 클릭→ 이전학기 검색조건
              더보기 클릭 → 학년도 및 학기 변경 → 검색 버튼
              <br />
              <br />
              1. 수강신청 대상 : 전체학생(휴학생 포함) - 2023년 2월 졸업예정자는
              2022학년도 2학기 등록자만 가능
              <br />
              2. 수강신청학점 : 최대 6학점
              <br />
              3. 학부/대학원 과정간, 대학원의 석사/박사과정간 과거 이수한 과목의
              수강신청(중복수강)은 가능하나 졸업/이수학점으로 인정되지 않습니다.
              <br />
              - 학부 3학년이상만 석사과정의 교과목 수강 가능(1,2학년 수강시
              성적표에 표기되나, 졸업학점으로 인정 안됨)
              <br />
              - 대학원 과정 학생의 경우 6학점까지 학부과목 수강 가능(대학원
              과정(석,박사) 통산)(학과장 또는 전공주임교수의 승인, 가능여부를
              반드시 해당 대학(원)에 문의후 신청)
              <br />
              4. 수강신청시 보안문자(2자리 숫자)를 입력해야만 수강신청이
              가능합니다.
              <br />
              5. 수강신청 및 변경 후 반드시 개인 수강내역을 확인하시어 불이익이
              발생하지 않도록 주의하시기 바랍니다.
              <br />
              6. 수강신청관련 실수 사례
              <br />
              - 수강 미신청 후 수강신청으로 착각하여 계속 수업에 참석(성적취득
              불가)
              <br />
              - 수강신청, 변경, 취소기간 종료 후 처리 요청(처리불가)
              <br />
              7. 수강신청에 어려움이 있을 경우 반드시 소속 단과대학(학과)에
              수강지도를 받으시기 바랍니다.
              <br />
              [매크로 사용 및 ID를 도용하는 경우 매크로 사용 및 ID도용자는 IP를
              추적 등을 통해 학칙(규정)에 따라 처리될 수 있습니다.]
              <br />
              <br />
            </div>
          </div>
          <div className="body-item">
            <div className="body-header">
              &nbsp;
              <span className="blue-words">공지사항</span>
              <div className="additional-info">
                <a href="https://sugang.snu.ac.kr/sugang/co/co100.action">
                  더보기
                </a>
              </div>
            </div>
            <ul className="announcement">
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co102.action?boardId=NOTICE&noticeInptOrd=6325&noticeSortNo=9999700replyOrd=0">
                  [필독] 2022학년도 동계계절학기 수강신청 부하시간..
                </a>
              </li>
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co102.action?boardId=NOTICE&noticeInptOrd=6322&noticeSortNo=9999701replyOrd=0">
                  ★2022학년도 동계계절수업 수강신청 안내
                </a>
              </li>
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co102.action?boardId=NOTICE&noticeInptOrd=6266&noticeSortNo=9999712replyOrd=0">
                  ★[2022.2학기] 1학년(신입생) 수강 우선 교양교..
                </a>
              </li>
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co102.action?boardId=NOTICE&noticeInptOrd=6231&noticeSortNo=9999725replyOrd=0">
                  ★2022학년도 2학기 출석인정 신청 및 조기취업자 출..
                </a>
              </li>
            </ul>
          </div>
          <div className="body-item">
            <div className="body-header">
              &nbsp;
              <span className="blue-words">FAQ</span>
              <div className="additional-info">
                <a href="https://sugang.snu.ac.kr/sugang/co/co110.action">
                  더보기
                </a>
              </div>
            </div>
            <ul className="faq">
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co112.action?boardId=FAQ&noticeInptOrd=6124&noticeSortNo=9999977replyOrd=0">
                  <span className="gray-word">Q</span>&nbsp; 정규학기 및
                  계절학기 폐강 기준 안내
                </a>
              </li>
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co112.action?boardId=FAQ&noticeInptOrd=5556&noticeSortNo=9999978replyOrd=0">
                  <span className="gray-word">Q</span>&nbsp; 로그인 방식 변경
                  안내
                </a>
              </li>
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co112.action?boardId=FAQ&noticeInptOrd=6299&noticeSortNo=9999975replyOrd=0">
                  <span className="gray-word">Q</span>&nbsp; 정원외신청 FAQ
                </a>
              </li>
              <li>
                <a href="https://sugang.snu.ac.kr/sugang/co/co112.action?boardId=FAQ&noticeInptOrd=6125&noticeSortNo=9999976replyOrd=0">
                  <span className="gray-word">Q</span>&nbsp; 크로스리스팅 강의 ⓒ
                  관련 안내
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <a href="https://www.snu.ac.kr/personal_information">
            개인정보취급방침
          </a>{' '}
          &nbsp;|&nbsp;
          <a href="https://www.snu.ac.kr/prohibition_of_unauthorized_email_collection">
            이메일무단수집거부
          </a>
          <br />
          <span className="darkgray-word">
            Copyright (C) 2020 SEOUL NATIONAL UNIVERSITY. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Body
