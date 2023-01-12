import styled from 'styled-components'
import axios from 'axios'
const Wrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 15%;
  border: 1px solid #0f3e8e;
  border-radius: 10px;
  background: #fff;
  width: 70%;
  height: ${(props) => (props.searchopen ? '80%' : '0')};
  opacity: ${(props) => (props.searchopen ? '1' : '0')};
  z-index: ${(props) => (props.searchopen ? '1' : '-1')};
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
const Searchselect = ({ selectdata, id }) => {
  return (
    <select id={id}>
      <option>전체</option>
      {selectdata.map((data) => {
        return <option key={data}>{data}</option>
      })}
    </select>
  )
}
const Searchcourse = ({ setSearchopen, searchopen }) => {
  const submit = (e) => {
    e.preventDefault()
  }
  const subject = [
    '교양',
    '전필',
    '전선',
    '일선',
    '교직',
    '논문',
    '대학원',
    '공통',
    '학사',
  ]
  return (
    <Wrapper searchopen={searchopen}>
      <form onSubmit={submit}>
        <Top>
          <span>상세검색 년도 강좌를 검색합니다.</span>
          <div>
            <button>
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
                <Searchselect id={'search1'} selectdata={['학사']} />
                <Searchselect id={'search2'} selectdata={['1학년']} />
              </div>
            </Searchitem>
            <Searchitem>
              <span>개설학과</span>
              <div>
                <Searchselect id={'search3'} selectdata={['']} />
                <Searchselect id={'search4'} selectdata={['']} />
                <Searchselect id={'search5'} selectdata={['']} />
              </div>
            </Searchitem>
            <Searchitem>
              <span>교과구분</span>
              <div>
                {subject.map((data, i) => (
                  <div key={data}>
                    <input type="checkbox" id={`subject${i}`} />
                    <span>{data}</span>
                  </div>
                ))}
              </div>
            </Searchitem>
          </div>
          <div>
            <Searchitem>
              <span>교양영역</span>
              <div>
                <Searchselect
                  id={'search6'}
                  selectdata={[
                    '학문의 기초',
                    '학문의 세계',
                    '선택교양',
                    '전공영역',
                  ]}
                />
                <Searchselect id={'search7'} selectdata={['']} />
              </div>
            </Searchitem>
            <Searchitem>
              <span>과정구분</span>
              <Searchselect id={'search8'} selectdata={['학사', '대학원']} />
            </Searchitem>
            <Searchitem>
              <span>검색제외 설정</span>
              <div>
                <input id={'search9'} type="text" />
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
