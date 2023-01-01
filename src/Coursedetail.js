import styled from 'styled-components'
import React, { useState } from 'react'
const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  right: 5%;
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
const Close = styled.button``
const Header = styled.div``
const Container = styled.div``
const Tap = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0;
  li {
    border: 1px solid #ccc;
    list-style: none;
    width: 14.28%;
  }
`
const Tabbutton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.tabnum === props.number ? '#ccc' : '#fff'};
  border: none;
`

const Coursedetail = () => {
  const [tabnum, setTabnum] = useState(0)
  const tab = [
    { title: '강좌상세조회' },
    { title: '교과목개요' },
    { title: '강의계획서' },
    { title: '수강반' },
    { title: '2군 교과목' },
    { title: '교수님' },
    { title: '동일대체 교과목' },
    { title: 'Cross-Listing 교과목' },
  ]
  return (
    <Wrapper>
      <Close />
      <Header>강좌상세정보</Header>
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
