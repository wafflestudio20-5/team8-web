import logo from './logo.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { createContext, useState } from 'react'
import Header from './Header'
import Coursedetail from './Coursedetail'
import Searchcourse from './Searchcourse'
import Review from './Review'
function App() {
  const [modal, setModal] = useState(false)
  const [searchopen, setSearchopen] = useState(false)
  return (
    <div>
      <Header searchopen={searchopen} setSearchopen={setSearchopen} />
      <Searchcourse searchopen={searchopen} setSearchopen={setSearchopen} />

      {modal && <Coursedetail modal={modal} setModal={setModal} />}
      <div>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/mypage" element={<h1>mypage</h1>} />
          <Route path="/events" element={<h1>Events</h1>} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
