import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useClassDataContext } from './Context'

const Wrapper = styled.div`
  z-index: 100;
  width: 95%;
  height: 95%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  right: 2.5%;
  display: flex;
  flex-direction: column;
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    border-top: 2px solid #939393;
  }
  tr {
    height: 50px;
  }
  th,
  td {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    line-height: 1.5;
    vertical-align: middle;
    word-break: break-all;
    text-overflow: ellipsis;
    word-wrap: break-word;
    border: 1px solid #e7e7e7;
    text-align: center;
  }
  th {
    font-weight: 400;
    background: #f8f8f8;
    color: #333;
  }
  td {
    font-weight: 300;
    color: #666;
  }
`
const Detailcap = styled.div`
  display: flex;
  padding: 25px 20px;
  line-height: 1.5;
  border-top: 1px solid #939393;
  border-bottom: 1px solid #e7e7e7;
  background: #f8f8f8;
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    li {
      list-style: none;
      width: 50%;
    }
    li > span:not(:first-of-type):before {
      content: ' ';
      border-left: 1px solid #ccc;
      color: #ccc;
      font-size: 1rem;
      margin: 0 10px;
    }
    li:not(:first-of-type) {
      font-size: 0.8rem;
    }
    em {
      color: #376dc8;
    }
  }
`
const Close = styled.button`
  position: absolute;
  border: none;
  background-color: #fff;
  width: 30px;
  height: 20px;
  right: 15px;
  top: 15px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`
const Header = styled.div`
  height: 3rem;
  padding-top: 40px;
  font-size: 24px;
  text-align: center;
  div {
    margin: auto;
    width: fit-content;
  }
`
const Container = styled.div`
  padding: 10px 40px;
  overflow: auto;
`
const Tap = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0;
  height: 4rem;
  li {
    border: 1px solid #ccc;
    list-style: none;
    width: 14.28%;
  }
`
const Tabbutton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: ${(props) =>
    props.tabnum === props.number ? '#ccc' : '#fff'};
  border: none;
`
const Detailclass = styled.div`
  > div > span {
    font-size: 16px;
    color: #376dc8;
    font-weight: 500;
    margin: 30px 10px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`
const Detailclass2 = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
  }
  td,
  th {
    text-align: center;
    font-size: 14px;
    border: 0;
  }
  td {
    font-weight: 300;
    color: #666;
    height: 4rem;
  }
  th {
    font-weight: 400;
    background: #f8f8f8;
    color: #333;
    height: 50px;
  }
  tr {
    border-bottom: 1px solid #e7e7e7;
  }
`
const Overview = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
`

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`

const Coursedetail = () => {
  useEffect(() => {
    document.body.style = `overflow: hidden`
    return () => (document.body.style = `overflow: auto`)
  }, [])
  const { modal, setModal, pickcourses } = useClassDataContext()
  const data = pickcourses
  const [tabnum, setTabnum] = useState(0)
  const tab = [
    '강좌상세조회',
    '교과목개요',
    '강의계획서',
    '수강반',
    '2군 교과목',
    '동일대체 교과목',
    'Cross-Listing 교과목',
  ]
  const detail = [
    { title: '정원', content: data?.maximum },
    { title: '계절학기 학점당 수강료', content: '0' },
    { title: '수업진행 언어', content: '0' },
    { title: '성적부여형태', content: '0' },
    { title: '성적평가방법 변경가능', content: '0' },
    { title: '', content: '-' },
  ]
  const detail2 = [
    { title: '상대평가 교과목', content: '0' },
    { title: '제한 교과목', content: '0' },
    { title: '외국인수강 제한교과목', content: '0' },
    { title: '교직 교과목', content: '0' },
    { title: '통년 교과목', content: '0' },
    { title: '반복 교과목 (반복이수학기가능)', content: '0' },
    { title: '논문연구 교과목', content: '0' },
    { title: '논문제출자격시험 대체 교과목', content: '0' },
    { title: '외국어시험 대체 교과목', content: '0' },
    { title: '일반원격강좌', content: '0' },
  ]
  const detail3 = [
    {
      title: ' 강의평가(5점만점)',
      content: Math.round(data?.rate * 100) / 100,
    },
    { title: '전자출결 사용여부', content: '0' },
    { title: '면담시간', content: '0' },
    { title: '비고', content: '0' },
  ]
  const detail4 = [
    { title: '년도', content: '0' },
    { title: '학기', content: '0' },
    { title: '교과목번호', content: '0' },
  ]

  const Detailtable = ({ detail }) => {
    let app = []
    for (let i = 0; i < detail.length; i = i + 2) {
      app.push(
        <tr key={detail[i].title}>
          <th>{detail[i].title}</th>
          <td>{detail[i].content}</td>
          <th>{detail[i + 1].title}</th>
          <td>{detail[i + 1].content}</td>
        </tr>,
      )
    }
    return (
      <table>
        <colgroup>
          <col span="4" />
        </colgroup>
        <tbody>{app}</tbody>
      </table>
    )
  }

  const Tabcontent = ({ tabnum }) => {
    const evaluate = [
      '출석',
      '과제',
      '중간',
      '기말',
      '수시평가',
      '태도',
      '기타',
      '합계',
    ]
    const classmeth = [
      '플립러닝',
      '이론위주 수업',
      '토론위주 수업',
      '프로젝트수업',
      '기타',
    ]
    if (tabnum === 0) {
      return (
        <Detailclass>
          <Detailcap>
            <ul>
              <li>
                <span>논문</span>
                <span>대학원</span>
                <span>0학년</span>
              </li>
              <li>
                <span>교수명</span>
                <span>{data?.department}</span>
              </li>
            </ul>
            <ul>
              <li>
                <strong>{data?.name}</strong>
              </li>
              <li>{data?.number}</li>
              <li>
                학점-강의 실습
                <em>0-0-0</em>
              </li>
            </ul>
          </Detailcap>
          <div>
            <span>강좌정보</span>
            <Detailtable detail={detail} />
          </div>
          <div>
            <span>수업 형태</span>
            <table>
              <colgroup>
                <col span="4" />
              </colgroup>
              <tbody>
                <tr>
                  <th>교시별 수업형태(강의실 동-호)</th>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>교과목정보</span>
            <Detailtable detail={detail2} />
          </div>
          <div>
            <span>재이수 정보</span>
            <table>
              <colgroup>
                <col span="4" />
              </colgroup>
              <tbody>
                {detail4.map((item, i) => (
                  <tr key={item.title}>
                    <th>{item.title}</th>
                    <td colSpan={3}>{item.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <span>기타정보</span>
            <Detailtable detail={detail3} />
          </div>
        </Detailclass>
      )
    } else if (tabnum === 1) {
      return (
        <Detailclass>
          <div>
            <span>교과목개요(국문)</span>
            <Overview>개요없음</Overview>
          </div>
          <div>
            <span>교과목개요(영문)</span>
            <Overview>No content</Overview>
          </div>
        </Detailclass>
      )
    } else if (tabnum === 2) {
      return (
        <Detailclass>
          <table>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>학점</th>
                <th>과</th>
                <th>교수</th>
              </tr>
              <tr>
                <td>{data?.credit}</td>
                <td>{data?.department}</td>
                <td>{data?.professor}</td>
              </tr>
            </thead>
          </table>
          <div>
            <span>파일 다운로드</span>
            <table>
              <colgroup>
                <col style={{ width: '30%' }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>첨부파일(국문)</th>
                  <td></td>
                </tr>
                <tr>
                  <th>첨부파일(영문)</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>강의 계획 상세</span>
            <table>
              <colgroup>
                <col style={{ width: '16%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '14%' }} span={4} />
              </colgroup>
              <tbody>
                <tr>
                  <th>1.수업목표</th>
                  <td colSpan={7}>없음</td>
                </tr>
                <tr>
                  <th>2.교재 및 참고문헌</th>
                  <td colSpan={7}>없음</td>
                </tr>
                <tr>
                  <th rowSpan={11}>3.평가방법</th>
                  <td>성적부여방식</td>
                  <td>절대평가</td>
                  <td>등급제여부</td>
                  <td colSpan={4}>A~F</td>
                </tr>
                {evaluate.map((item, i) => (
                  <tr key={item}>
                    <td>{item}(%)</td>
                    <td>0%</td>
                    <td colSpan={5}></td>
                  </tr>
                ))}
                <tr>
                  <td>출석규정</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <td>기타사항</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <th>4.정원외신청</th>
                  <td>수용가능인원</td>
                  <td colSpan={6}>최대 {data?.maximum}명</td>
                </tr>
                <tr>
                  <th rowSpan={2}>5.수강생 참고사항</th>
                  <td colSpan={8}></td>
                </tr>
                <tr>
                  <td>면담시간/장소</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <th rowSpan={3}>6.강의계획</th>
                  <td rowSpan={2}> 수업방식</td>
                  {classmeth.map((item, i) => (
                    <td key={item}>
                      <input type="checkbox" disabled="disabled" />
                      <label>{item}</label>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>기타내용</td>
                  <td colSpan={5}></td>
                </tr>
                <tr>
                  <td colSpan={7}></td>
                </tr>
                <tr>
                  <th rowSpan={3}>7.장애학생 지원사항</th>
                  <td>강의 수강 관련</td>
                  <td colSpan={5}></td>
                </tr>
                <tr>
                  <td>과제 및 평가 관련</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <td>비고</td>
                  <td colSpan={7}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>주차별 강의계획</span>
            <table>
              <colgroup>
                <col style={{ width: '15%' }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>주차구분</th>
                  <th>주차별 강의계획내용</th>
                </tr>
                <tr>
                  <td colSpan={2}>주차별 강의계획 내용 없음</td>
                </tr>
              </thead>
            </table>
          </div>
        </Detailclass>
      )
    } else if (tabnum === 3) {
      return (
        <Detailclass2>
          {' '}
          <table>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col />
              <col style={{ width: '25%' }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>구분</th>
                <th>학과</th>
                <th>학년/학번</th>
                <th>이수과정명/이수전공</th>
              </tr>
              <tr>
                <td colSpan={4}>내용없음</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      )
    } else if (tabnum === 4) {
      return (
        <Detailclass2>
          <table>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>부제코드</th>
                <th>부제명</th>
                <th>지정년도</th>
                <th>지정학기</th>
              </tr>
              <tr>
                <td colSpan={4}>내용없음</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      )
    } else if (tabnum === 5) {
      return (
        <Detailclass2>
          <table>
            <colgroup>
              <col span={2} style={{ width: '15%' }} />
              <col />
              <col span={2} style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>지정구분</th>
                <th>교과구분</th>
                <th>[교과목 번호]교과목명</th>
                <th>학점</th>
                <th>차수</th>
              </tr>
              <tr>
                <td colSpan={4}>내용없음</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      )
    } else if (tabnum === 6) {
      return (
        <Detailclass2>
          <table>
            <colgroup>
              <col span={2} style={{ width: '15%' }} />
              <col />
              <col span={2} style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>지정구분</th>
                <th>교과구분</th>
                <th>[교과목 번호]교과목명</th>
                <th>학점</th>
                <th>차수</th>
              </tr>
              <tr>
                <td colSpan={4}>내용없음</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      )
    }
  }
  return (
    <div>
      <Back />
      <Wrapper>
        <Close
          onClick={() => {
            setModal(false)
          }}
        >
          <img src="/delete.png" />
        </Close>
        <Header>
          <div>강좌상세정보</div>
        </Header>
        <Container>
          <Tap tabnum={tabnum}>
            {tab.map((item, i) => (
              <li key={item}>
                <Tabbutton
                  number={i}
                  tabnum={tabnum}
                  onClick={() => {
                    setTabnum(i)
                  }}
                >
                  {item}
                </Tabbutton>
              </li>
            ))}
          </Tap>
          <Tabcontent tabnum={tabnum} />
        </Container>
      </Wrapper>
    </div>
  )
}

export default Coursedetail
