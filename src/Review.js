import styled from 'styled-components'
import Starrating from './Starrating'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Reviewpage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`
const Reviewlist = styled.div`
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

const Review = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    axios
      .get('https://snu-sugang.o-r.kr/lectures/1/reviews')
      .then((res) => {
        setReviews(res.data.results)
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  return (
    <Reviewpage>
      <h1>과목 리뷰 과목명 교수명</h1>
      <button
        onClick={() => {
          window.location.href = '/newreview'
        }}
      >
        글쓰기
      </button>
      <Reviewlist>
        <table>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>별점</th>
              <th>제목</th>
              <th>수강학기</th>
              <th>작성자</th>
              <th>작성날짜</th>
            </tr>
            {reviews.map((review) => {
              return (
                <tr
                  key={review.id}
                  onClick={() => {
                    window.location.href = '/reviewcontent'
                  }}
                >
                  <td>
                    <Starrating rating={review.rate} />
                  </td>
                  <td>{review.title}</td>
                  <td>{review.semester}</td>
                  <td>{review.created_by}</td>
                  <td>{review.created_at.split('T')[0]}</td>
                </tr>
              )
            })}
          </thead>
        </table>
      </Reviewlist>
    </Reviewpage>
  )
}

export default Review
