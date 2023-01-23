import styled from 'styled-components'
import { useParams } from 'react-router'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

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
  > form > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`
const Backbut = styled.button`
  width: 3rem;
`
const Buttonbox = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Newreview = ({ setIsedit, isedit = false, edit = null }) => {
  const courseid = useParams().courseid
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [editrating, setEditrating] = useState(0)
  const submit = (e) => {
    e.preventDefault()
    console.log(1)
    const func = isedit ? axios.put : axios.post
    const url =
      `https://snu-sugang.o-r.kr/lectures/${courseid}/reviews/` +
      (isedit ? edit.id : '')
    func(
      url,
      {
        title: e.target.title.value,
        content: e.target.content.value,
        rate: editrating,
        semester: '2022-2',
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
    navigate(`/review/${courseid}`)
  }
  const dummy = [1, 2, 3, 4, 5]
  return (
    <Newreviewpage>
      <form onSubmit={submit}>
        <div>
          <Star>
            {dummy.map((i) => (
              <Fragment key={i}>
                <input
                  type="radio"
                  id={`${i}-stars`}
                  name="rating"
                  onChange={() => {
                    setEditrating(i)
                  }}
                  defaultChecked={edit?.rate === i ? true : false}
                />
                <label htmlFor={`${i}-stars`}>★</label>
              </Fragment>
            ))}
          </Star>
          <Buttonbox>
            <Backbut
              onClick={() => {
                if (isedit) setIsedit(false)
                else navigate(-1)
              }}
            >
              취소
            </Backbut>
            <button type="submit">{isedit ? '수정' : '등록'}</button>
          </Buttonbox>
        </div>
        <div>
          <span>제목</span>
          <input type="text" id="title" defaultValue={edit?.title} />
        </div>
        <div>
          <span>내용</span>
          <textarea id="content" defaultValue={edit?.content} />
        </div>
      </form>
    </Newreviewpage>
  )
}
export default Newreview
