import styled from 'styled-components'
import React, { useState } from 'react'
const Wrapper = styled.div`
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
  right: 5px;
  top: 5px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`
const Header = styled.div`
  height: 4rem;
  padding-top: 60px;
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

const Coursedetail = ({ modal, setModal }) => {
  const [tabnum, setTabnum] = useState(0)
  const tab = [
    { title: '강좌상세조회' },
    { title: '교과목개요' },
    { title: '강의계획서' },
    { title: '수강반' },
    { title: '2군 교과목' },
    { title: '동일대체 교과목' },
    { title: 'Cross-Listing 교과목' },
  ]
  const detail = [
    { title: '정원', content: '0' },
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
    { title: ' 강의평가(5점만점)', content: '0' },
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
                <span>과</span>
              </li>
            </ul>
            <ul>
              <li>
                <strong>강좌명</strong>
              </li>
              <li>강좌번호</li>
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
          {' '}
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
            <li key={item.title}>
              <Tabbutton
                number={i}
                tabnum={tabnum}
                onClick={() => {
                  setTabnum(i)
                }}
              >
                {item.title}
              </Tabbutton>
            </li>
          ))}
        </Tap>
        <Tabcontent tabnum={tabnum} />
      </Container>
    </Wrapper>
  )
}

export default Coursedetail
