import logo from './logo.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { createContext, useState } from 'react'
import Header from './Header'
import Coursedetail from './Coursedetail'
import Searchcourse from './Searchcourse'
function App() {
  const [modal, setModal] = useState(true)
  const [searchopen, setSearchopen] = useState(true)
  return (
    <div>
      <Header />
      {searchopen && <Searchcourse />}
      {modal && <Coursedetail modal={modal} setModal={setModal} />}
      <div>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/mypage" element={<h1>mypage</h1>} />
          <Route path="/events" element={<h1>Events</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
