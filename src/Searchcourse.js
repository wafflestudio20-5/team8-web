import styled from 'styled-components'
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
  transition: all 1s;
`
const Footer = styled.div`
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
    font-size: 20px;
  }
  button:first-child {
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
    vertical-align: middle;
    width: 15px;
    height: 15px;
    margin-top: -2px;
    margin-right: 3px;
  }
  div {
    display: flex;
    align-items: center;
  }
`
const Content = styled.div`
  height: 80%;
`
const Searchcourse = ({ setSearchopen, searchopen }) => {
  return (
    <Wrapper searchopen={searchopen}>
      <Top>
        <span>상세검색 년도 강좌를 검색합니다.</span>
        <div>
          <button>초기화</button>
          <Close
            onClick={() => {
              setSearchopen(false)
            }}
          >
            <img src="/delete.png" />
          </Close>
        </div>
      </Top>
      <Content></Content>
      <Footer>검색</Footer>
    </Wrapper>
  )
}

export default Searchcourse
