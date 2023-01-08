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
`
const Detailcap = styled.div`
  display: flex;
  margin-bottom: 40px;
  padding: 25px 20px;
  line-height: 1.5;
  border-top: 1px solid #939393;
  border-bottom: 1px solid #e7e7e7;
  background: #f8f8f8;
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
  padding: 0 25px;
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
        <div>
          <Detailcap>
            <ul></ul>
            <ul></ul>
          </Detailcap>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Coursedetail
