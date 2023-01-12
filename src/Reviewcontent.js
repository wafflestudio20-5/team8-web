import styled from 'styled-components'
import axios from 'axios'
import Starrating from './Starrating'
import { useEffect, useState } from 'react'
import { clear } from '@testing-library/user-event/dist/clear'
const Revcon = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem;
`
const Reviewbox = styled.div`
  div:nth-child(1) {
    width: fit-content;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
`
const Commentlist = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 2.5%;
  textarea {
    width: 95%;
    margin: 0.5rem;
  }
`
const Commentbox = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  border-bottom: 1px solid black;
  padding: 0.5rem;
  align-items: center;
  font-size: 0.8rem;
  > div {
    display: flex;
    align-items: center;
  }
  div:nth-child(1) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  span:nth-child(1) {
    width: 80%;
  }
  img {
    width: 20px;
    height: 20px;
  }
`
const Icon = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(100%);
`
const Reviewcontent = () => {
  const [picked, setPicked] = useState(0)
  const times = [
    { time: '분', value: 1000 * 60 },
    { time: '시간', value: 1000 * 60 * 60 },
    { time: '일', value: 1000 * 60 * 60 * 24 },
    { time: '주', value: 1000 * 60 * 60 * 24 * 7 },
    { time: '개월', value: 1000 * 60 * 60 * 24 * 30 },
    { time: '년', value: 1000 * 60 * 60 * 24 * 365 },
  ].reverse()
  const elapsedTime = (time) => {
    const now = new Date()
    const past = new Date(time)
    const diff = now.getTime() - past.getTime()
    for (const value of times) {
      const between = Math.floor(diff / value.value)
      if (between > 0) {
        return `${between}${value.time}전`
      }
    }
    return '방금전'
  }
  const [reviews, setReviews] = useState([])
  const [comments, setComments] = useState([])
  useEffect(() => {
    axios
      .get('https://snu-sugang.o-r.kr/lectures/1/reviews/1')
      .then((res) => {
        console.log(res.data)
        setReviews(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
    axios
      .get('https://snu-sugang.o-r.kr/lectures/1/reviews/1/comments')
      .then((res) => {
        console.log(res.data)
        setComments(res.data.results)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  const submit = (e) => {
    axios
      .post(
        'https://snu-sugang.o-r.kr/lectures/1/reviews/1/comments/',
        {
          content: e.target.comment.value,
        },
        {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        e.target.comment.value = ''
        setComments([...comments, res.data])
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const [edit, setEdit] = useState('')
  return (
    <Revcon>
      <Reviewbox>
        <div>
          <Starrating rating={reviews.rating} />
        </div>
        <span>제목 :{reviews.title}</span>
        {reviews.content}
      </Reviewbox>
      <Commentlist>
        <span>댓글</span>
        {comments.map((item) => (
          <Commentbox>
            {picked === item.id ? (
              <div>
                <textarea
                  defaultValue={item.content}
                  onChange={(e) => {
                    setEdit(e.target.value)
                  }}
                />
                <button
                  onClick={() => {
                    setPicked(0)
                    axios.put(
                      `https://snu-sugang.o-r.kr/lectures/1/reviews/1/comments/${item.id}/`,
                      {
                        content: edit,
                      },
                      {
                        headers: {
                          Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
                          'Content-Type': 'application/json',
                        },
                      },
                    )
                  }}
                >
                  수정
                </button>
              </div>
            ) : (
              <div>
                <span>{item.content}</span>{' '}
                <span>{item.created_by ? item.created_by : '익명'}</span>
                <span>{elapsedTime(item.created_at)}</span>
              </div>
            )}
            {item.created_by ? (
              <Icon>
                <img
                  src={'/edit.svg'}
                  alt="edit"
                  onClick={() => {
                    setPicked(item.id)
                  }}
                />
                <img
                  src={'/delete.svg'}
                  alt="delete"
                  onClick={() => {
                    axios
                      .delete(
                        `https://snu-sugang.o-r.kr/lectures/1/reviews/1/comments/${item.id}/`,
                        {
                          headers: {
                            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
                            'Content-Type': 'application/json',
                          },
                        },
                      )
                      .then((res) => {
                        console.log(res.data)
                        setComments(
                          comments.filter((comment) => comment.id !== item.id),
                        )
                      })
                      .catch((e) => {
                        console.log(e)
                      })
                  }}
                />
              </Icon>
            ) : null}
          </Commentbox>
        ))}
        <div>
          <form onSubmit={submit}>
            <textarea id="comment" />
            <button type="submit">작성</button>
          </form>
        </div>
      </Commentlist>
    </Revcon>
  )
}
export default Reviewcontent
