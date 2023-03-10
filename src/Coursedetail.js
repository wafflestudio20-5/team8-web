import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useClassDataContext } from "./Context";

const Modalpage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
`;
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
`;
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
      content: " ";
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
`;
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
`;
const Header = styled.div`
  height: 3rem;
  padding-top: 40px;
  font-size: 24px;
  text-align: center;
  div {
    margin: auto;
    width: fit-content;
  }
`;
const Container = styled.div`
  padding: 10px 40px;
  overflow: auto;
`;
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
`;
const Tabbutton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: ${(props) =>
    props.tabnum === props.number ? "#ccc" : "#fff"};
  border: none;
`;
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
`;
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
`;
const Overview = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
`;

const Coursedetail = () => {
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  const { modal, setModal, pickcourses } = useClassDataContext();
  const data = pickcourses;
  const [tabnum, setTabnum] = useState(0);
  const tab = [
    "??????????????????",
    "???????????????",
    "???????????????",
    "?????????",
    "2??? ?????????",
    "???????????? ?????????",
    "Cross-Listing ?????????",
  ];
  const detail = [
    { title: "??????", content: data?.maximum },
    { title: "???????????? ????????? ?????????", content: "0" },
    { title: "???????????? ??????", content: "0" },
    { title: "??????????????????", content: "0" },
    { title: "?????????????????? ????????????", content: "0" },
    { title: "", content: "-" },
  ];
  const detail2 = [
    { title: "???????????? ?????????", content: "0" },
    { title: "?????? ?????????", content: "0" },
    { title: "??????????????? ???????????????", content: "0" },
    { title: "?????? ?????????", content: "0" },
    { title: "?????? ?????????", content: "0" },
    { title: "?????? ????????? (????????????????????????)", content: "0" },
    { title: "???????????? ?????????", content: "0" },
    { title: "???????????????????????? ?????? ?????????", content: "0" },
    { title: "??????????????? ?????? ?????????", content: "0" },
    { title: "??????????????????", content: "0" },
  ];
  const detail3 = [
    {
      title: " ????????????(5?????????)",
      content: Math.round(data?.rate * 100) / 100,
    },
    { title: "???????????? ????????????", content: "0" },
    { title: "????????????", content: "0" },
    { title: "??????", content: "0" },
  ];
  const detail4 = [
    { title: "??????", content: "0" },
    { title: "??????", content: "0" },
    { title: "???????????????", content: "0" },
  ];

  const Detailtable = ({ detail }) => {
    let app = [];
    for (let i = 0; i < detail.length; i = i + 2) {
      app.push(
        <tr key={detail[i].title}>
          <th>{detail[i].title}</th>
          <td>{detail[i].content}</td>
          <th>{detail[i + 1].title}</th>
          <td>{detail[i + 1].content}</td>
        </tr>
      );
    }
    return (
      <table>
        <colgroup>
          <col span="4" />
        </colgroup>
        <tbody>{app}</tbody>
      </table>
    );
  };

  const Tabcontent = ({ tabnum }) => {
    const evaluate = [
      "??????",
      "??????",
      "??????",
      "??????",
      "????????????",
      "??????",
      "??????",
      "??????",
    ];
    const classmeth = [
      "????????????",
      "???????????? ??????",
      "???????????? ??????",
      "??????????????????",
      "??????",
    ];
    if (tabnum === 0) {
      return (
        <Detailclass>
          <Detailcap>
            <ul>
              <li>
                <span>{data.curriculum}</span>
                <span>{data.degree}</span>
                <span>{data.grade}??????</span>
              </li>
              <li>
                <span>{data.professor}</span>
                <span>{data?.department}</span>
              </li>
            </ul>
            <ul>
              <li>
                <strong>{data?.name}</strong>
              </li>
              <li>{data?.number}</li>
              <li>
                ??????-??????-?????? &nbsp;
                <em>
                  {data.credit}-{data.lecture}-{data.lab}
                </em>
              </li>
            </ul>
          </Detailcap>
          <div>
            <span>????????????</span>
            <Detailtable detail={detail} />
          </div>
          <div>
            <span>?????? ??????</span>
            <table>
              <colgroup>
                <col span="4" />
              </colgroup>
              <tbody>
                <tr>
                  <th>????????? ????????????(????????? ???-???)</th>
                  {data.classroom.split("/").map((item) => (
                    <td>{item}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>???????????????</span>
            <Detailtable detail={detail2} />
          </div>
          <div>
            <span>????????? ??????</span>
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
            <span>????????????</span>
            <Detailtable detail={detail3} />
          </div>
        </Detailclass>
      );
    } else if (tabnum === 1) {
      return (
        <Detailclass>
          <div>
            <span>???????????????(??????)</span>
            <Overview>????????????</Overview>
          </div>
          <div>
            <span>???????????????(??????)</span>
            <Overview>No content</Overview>
          </div>
        </Detailclass>
      );
    } else if (tabnum === 2) {
      return (
        <Detailclass>
          <table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>??????</th>
                <th>???</th>
                <th>??????</th>
              </tr>
              <tr>
                <td>{data?.credit}</td>
                <td>{data?.department}</td>
                <td>{data?.professor}</td>
              </tr>
            </thead>
          </table>
          <div>
            <span>?????? ????????????</span>
            <table>
              <colgroup>
                <col style={{ width: "30%" }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>????????????(??????)</th>
                  <td></td>
                </tr>
                <tr>
                  <th>????????????(??????)</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>?????? ?????? ??????</span>
            <table>
              <colgroup>
                <col style={{ width: "16%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "14%" }} span={4} />
              </colgroup>
              <tbody>
                <tr>
                  <th>1.????????????</th>
                  <td colSpan={7}>??????</td>
                </tr>
                <tr>
                  <th>2.?????? ??? ????????????</th>
                  <td colSpan={7}>??????</td>
                </tr>
                <tr>
                  <th rowSpan={11}>3.????????????</th>
                  <td>??????????????????</td>
                  <td>????????????</td>
                  <td>???????????????</td>
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
                  <td>????????????</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <td>????????????</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <th>4.???????????????</th>
                  <td>??????????????????</td>
                  <td colSpan={6}>?????? {data?.maximum}???</td>
                </tr>
                <tr>
                  <th rowSpan={2}>5.????????? ????????????</th>
                  <td colSpan={8}></td>
                </tr>
                <tr>
                  <td>????????????/??????</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <th rowSpan={3}>6.????????????</th>
                  <td rowSpan={2}> ????????????</td>
                  {classmeth.map((item, i) => (
                    <td key={item}>
                      <input type="checkbox" disabled="disabled" />
                      <label>{item}</label>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>????????????</td>
                  <td colSpan={5}></td>
                </tr>
                <tr>
                  <td colSpan={7}></td>
                </tr>
                <tr>
                  <th rowSpan={3}>7.???????????? ????????????</th>
                  <td>?????? ?????? ??????</td>
                  <td colSpan={5}></td>
                </tr>
                <tr>
                  <td>?????? ??? ?????? ??????</td>
                  <td colSpan={6}></td>
                </tr>
                <tr>
                  <td>??????</td>
                  <td colSpan={7}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <span>????????? ????????????</span>
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>????????????</th>
                  <th>????????? ??????????????????</th>
                </tr>
                <tr>
                  <td colSpan={2}>????????? ???????????? ?????? ??????</td>
                </tr>
              </thead>
            </table>
          </div>
        </Detailclass>
      );
    } else if (tabnum === 3) {
      return (
        <Detailclass2>
          {" "}
          <table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col />
              <col style={{ width: "25%" }} />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>??????</th>
                <th>??????</th>
                <th>??????/??????</th>
                <th>???????????????/????????????</th>
              </tr>
              <tr>
                <td colSpan={4}>????????????</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      );
    } else if (tabnum === 4) {
      return (
        <Detailclass2>
          <table>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>????????????</th>
                <th>?????????</th>
                <th>????????????</th>
                <th>????????????</th>
              </tr>
              <tr>
                <td colSpan={4}>????????????</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      );
    } else if (tabnum === 5) {
      return (
        <Detailclass2>
          <table>
            <colgroup>
              <col span={2} style={{ width: "15%" }} />
              <col />
              <col span={2} style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>????????????</th>
                <th>????????????</th>
                <th>[????????? ??????]????????????</th>
                <th>??????</th>
                <th>??????</th>
              </tr>
              <tr>
                <td colSpan={4}>????????????</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      );
    } else if (tabnum === 6) {
      return (
        <Detailclass2>
          <table>
            <colgroup>
              <col span={2} style={{ width: "15%" }} />
              <col />
              <col span={2} style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>????????????</th>
                <th>????????????</th>
                <th>[????????? ??????]????????????</th>
                <th>??????</th>
                <th>??????</th>
              </tr>
              <tr>
                <td colSpan={4}>????????????</td>
              </tr>
            </thead>
          </table>
        </Detailclass2>
      );
    }
  };
  return (
    <Modalpage>
      <Wrapper>
        <Close
          onClick={() => {
            setModal(false);
          }}
        >
          <img src="/delete.png" />
        </Close>
        <Header>
          <div>??????????????????</div>
        </Header>
        <Container>
          <Tap tabnum={tabnum}>
            {tab.map((item, i) => (
              <li key={item}>
                <Tabbutton
                  number={i}
                  tabnum={tabnum}
                  onClick={() => {
                    setTabnum(i);
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
    </Modalpage>
  );
};

export default Coursedetail;
