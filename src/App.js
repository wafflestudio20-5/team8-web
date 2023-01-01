import logo from './logo.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Coursedetail from './Coursedetail'

function App() {
  return (
    <div>
      <Header />
      <Coursedetail />
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
