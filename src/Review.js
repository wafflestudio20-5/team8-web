import styled from 'styled-components'
const Reviewpage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`
const Reviewlist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #0f3e8e;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`
const Reviewbox = styled.div`
  display: flex;
  border: 1px solid #0f3e8e;
  height: 40px;
  border-radius: 10px;
`
const Reviewcontent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #0f3e8e;
  border-radius: 10px;
  height: 90%;
`
const Review = () => {
  return (
    <Reviewpage>
      <h1>과목 리뷰 과목명 교수명</h1>
      <Reviewlist>
        <Reviewbox>학기 평점 제목</Reviewbox>
      </Reviewlist>
      <Reviewcontent>
        <div>리뷰 내용</div>
        <div>작성자</div>
        <div>댓글</div>
      </Reviewcontent>
    </Reviewpage>
  )
}

export default Review
