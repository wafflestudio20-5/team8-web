import styled from 'styled-components'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

const Star = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 1.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  width: 5em;
  input {
    display: none;
  }
  label {
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #2b2a29;
    cursor: pointer;
  }
  input:checked ~ label {
    -webkit-text-fill-color: gold;
  }

  label:hover,
  label:hover ~ label {
    -webkit-text-fill-color: #fff58c;
  }
`
const Newreviewpage = styled.div`
  display: flex;
  padding: 1rem 3rem;
  flex-direction: column;
  input[type='text'] {
    width: 100%;
  }
  textarea {
    width: 100%;
    height: 20rem;
  }
`
const Backbut = styled.button`
  width: 3rem;
`
const Newreview = () => {
  const [token, setToken] = useState('')
  const [editrating, setEditrating] = useState(0)
  const dummy = [1, 2, 3, 4, 5]
  const submit = (e) => {
    e.preventDefault()
    axios
      .post(
        'https://snu-sugang.o-r.kr/lectures/1/reviews/',
        {
          title: e.target.title.value,
          content: e.target.content.value,
          rate: editrating,
          semester: 0,
        },
        {
          headers: {
            Authorization: `token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTg4ODYzNjk0fQ.dw-OMl77XAkiZtklnvjwIgDs4lIJouMshL1LT5Va6og`,
            'Content-Type': `application/json`,
          },
        },
      )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Newreviewpage>
      <Backbut
        onClick={() => {
          window.history.back()
        }}
      >
        취소
      </Backbut>
      <form onSubmit={submit}>
        <Star>
          {dummy.map((i) => (
            <Fragment key={i}>
              <input
                type="radio"
                id={`${i}-stars`}
                name="rating"
                value={i}
                v-model="ratings"
                onChange={() => {
                  setEditrating(i)
                  console.log(editrating)
                }}
                checked={true}
              />
              <label htmlFor={`${i}-stars`} className="star">
                ★
              </label>
            </Fragment>
          ))}
        </Star>
        <div>
          <span>제목</span>
          <input type="text" id="title" />
        </div>
        <div>
          <span>내용</span>
          <textarea id="content" />
        </div>
        <button type="submit">등록</button>
      </form>
    </Newreviewpage>
  )
}
export default Newreview
