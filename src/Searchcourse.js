import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useUserDataContext, useCourseDataContext } from './Context'
import { useNavigate } from 'react-router-dom'
import { depart, subject, culture, culture2 } from './data'
const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 15%;
  border: 1px solid #0f3e8e;
  border-radius: 10px;
  background: #fff;
  width: 70%;
  height: ${(props) => (props.searchopen ? '60%' : '0')};
  opacity: ${(props) => (props.searchopen ? '1' : '0')};
  z-index: ${(props) => (props.searchopen ? '20' : '-1')};
  transition: all 1s;
`
const Footer = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #0f3e8e;
  color: #fff;
  text-align: center;
  line-height: 50px;
  border-radius: 0 0 10px 10px;
`
const Close = styled.button`
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
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #d3d5e4;
  margin: 0 auto;
  width: 90%;
  span {
    font-size: 14px;
  }
  button:first-child {
    width: 6rem;
    height: 26px;
    border: 1px solid #e5e5e5;
    border-radius: 18px;
    background: #fff;
    font-size: 13px;
    color: #666;
    cursor: pointer;
  }
  button:first-child:before {
    content: '';
    display: inline-block;
    background-image: url('/reset.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: transform 0.3s;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    margin-top: -2px;
    margin-right: 3px;
  }
  button:first-child:hover:before {
    transform: rotate(180deg);
  }
  input[type='reset'] {
    border: none;
    background: none;
  }
  div {
    display: flex;
    align-items: center;
  }
`
const Content = styled.div`
  margin-top: 5%;
  height: 60%;
  display: flex;
  flex-direction: row;
  > div {
    width: 50%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  > div:first-child {
    border-right: 1px solid #d3d5e4;
  }
`
const Searchitem = styled.div`
  display: flex;
  align-items: center;
  span:not(:last-child) {
    width: 20%;
  }
  > div {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
  }
  select {
    width: 45%;
    margin: 5px;
    height: 34px;
    font-size: 12px;
    color: #666;
  }
  input + span {
    font-size: 10px;
    color: #666;
  }
  input[type='text'] {
    height: 25px;
    margin: 5px;
    width: 90%;
  }
  input[type='checkbox'] {
    margin: 5px;
  }
  input[type='checkbox'] + span {
    font-size: 12px;
    color: #666;
  }
`
const Searchselect = ({ selectdata, setdata = null }) => {
  return (
    <select
      onChange={(e) => {
        if (setdata) setdata(e.target.value)
      }}
    >
      <option>전체</option>
      {selectdata.map((data) => {
        return <option key={data}>{data}</option>
      })}
    </select>
  )
}
const Searchcourse = ({ setSearchopen, searchopen }) => {
  const { setGetting, setRegisterparam } = useCourseDataContext()
  const submit = (e) => {
    e.preventDefault()
    const dummy = [7, 8, 9, 10, 11, 12, 13, 14, 15]
    const curr = dummy
      .map((data, i) => (e.target[data].checked ? subject[i] : null))
      .filter((data) => data)
    setRegisterparam({
      grade: e.target[4].value === '전체' ? null : e.target[4]?.slice(0, 1),
      degree: e.target[3].value === '전체' ? null : e.target[3].value,
      college: e.target[5].value === '전체' ? null : e.target[5].value,
      department: e.target[6].value === '전체' ? null : e.target[6].value,
      curriculum: null,
      exception: e.target[16].value,
    })
    setGetting(true)
    navigate(`/search`)
  }

  const [dep, setDep] = useState()
  const navigate = useNavigate()
  return (
    <Wrapper searchopen={searchopen}>
      <form onSubmit={submit}>
        <Top>
          <span>상세검색 년도 강좌를 검색합니다.</span>
          <div>
            <button
              onClick={() => {
                setDep(null)
                setRegisterparam(null)
              }}
            >
              <input type="reset" />
            </button>
            <Close
              onClick={() => {
                setSearchopen(false)
              }}
            >
              <img src="/delete.png" />
            </Close>
          </div>
        </Top>
        <Content>
          <div>
            <Searchitem>
              <span>학년</span>
              <div>
                <Searchselect
                  selectdata={[
                    '학사',
                    '석사',
                    '박사',
                    '석박사통합',
                    '학석사연계',
                    '학석사통합',
                    '복합학위',
                  ]}
                  onchange={(e) => {
                    console.log(e.target.value)
                  }}
                />
                <Searchselect
                  selectdata={Array(5)
                    .fill(1)
                    .map((data, i) => i + 1 + '학년')}
                />
              </div>
            </Searchitem>
            <Searchitem>
              <span>개설학과</span>
              <div>
                <Searchselect
                  selectdata={depart.map((i) => i.name)}
                  setdata={setDep}
                />
                <Searchselect
                  selectdata={
                    dep && dep !== '전체'
                      ? depart.find((data) => data.name === dep).data
                      : ['']
                  }
                />
              </div>
            </Searchitem>
          </div>
          <div>
            <Searchitem>
              <span>교과구분</span>
              <div>
                {subject.map((data, i) => (
                  <div key={data}>
                    <input type="checkbox" />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            </Searchitem>
            <Searchitem>
              <span>검색제외 설정</span>
              <div>
                <input type="text" />
                <span>
                  입력하는 단어가 포함된 강좌명을 검색결과에서 제외하라는 조건을
                  설정합니다. 여러 개의 단어는 쉼표(,)로 구분해서 입력하세요.
                </span>
              </div>
            </Searchitem>
          </div>
        </Content>
        <Footer
          type="submit"
          onClick={() => {
            setSearchopen(false)
          }}
        >
          검색
        </Footer>
      </form>
    </Wrapper>
  )
}

export default Searchcourse
